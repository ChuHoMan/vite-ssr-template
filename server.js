const fs = require('fs')
const path = require('path')
const express = require('express')
const { createServer: createViteServer } = require('vite')

async function createServer(isProd = process.env.NODE_ENV === 'production') {
  const app = express()

  // 读取html
  const indexHtmlProd = isProd ? fs.readFileSync(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8') : ''

  let vite
  if (!isProd) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      watch: {
        usePolling: true,
        interval: 100
      }
    })
    // 开发环境使用vite
    app.use(vite.middlewares)
  } else {
    app.use(require('serve-static')(path.resolve(__dirname, 'dist/client'), {
      index: false
    }))
  }

  app.use('*', async(req, res) => {
    // 服务的index.html
    const url = req.originalUrl
    console.log(req.originalUrl)
    try {
      // 读取manifest
      const manifest = isProd ? require('./dist/client/ssr-manifest.json') : {}

      let template, render
      if (!isProd) {
        console.log('development')
        // 应用vite HTML转换，注入vite HMR客户端
        // 同时给Vite插件应用HTML转换
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        // 加载服务器入口 vite.ssrLoadModule将自动转换
        // ESM源码将在NODE也能用
        render = (await vite.ssrLoadModule('/src/entry-server.js')).render
      } else {
        console.log('production')
        template = indexHtmlProd
        render = require('./dist/server/entry-server.js').render
      }

      // 渲染应用的 HTML。这假设 entry-server.js 导出的 `render`
      //  函数调用了相应 framework 的 SSR API。
      //  例如 ReactDOMServer.renderToString()
      const [appHtml, preloadLinks] = await render(url, manifest)
      // 注入应用渲染的HTML到模板中
      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)
      // 将渲染完成的HTML返回
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      // 如果异常，让vite修复堆栈，可以映射回实际源码当中
      vite && vite.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).end(e.message)
    }
  })

  app.listen(3000, () => {
    console.log('http://localhost:3000')
  })
}

createServer()

import type { App, DirectiveBinding } from 'vue'

function expendClick(el: HTMLElement, binding: DirectiveBinding) {
  const s = document.styleSheets[document.styleSheets.length - 1]
  const defaultPos = -10
  const [top, right, bottom, left] = binding.value && binding.value.split(',') || []
  const ruleStr = `content:"";position:absolute;top:-${top || defaultPos}px;bottom:-${bottom || defaultPos}px;right:-${right || defaultPos}px;left:-${left || defaultPos}px;`
  const classNameList = el.className.split(' ')
  el.className = classNameList.includes('expend_click_range') ? classNameList.join(' ') : [...classNameList, 'expend_click_range'].join(' ')
  el.style.position = el.style.position || 'relative'
  if (s.insertRule) {
    s.insertRule('.expend_click_range::before' + `{${ruleStr}}`, s.cssRules.length)
  } else {
    s.addRule('.expend_click_range::before', ruleStr, -1)
  }
}

export function setupExpendClickDirective(app: App) {
  app.directive('expend-click', {
    mounted(el, binding) {
      expendClick(el, binding)
    }
  })
}


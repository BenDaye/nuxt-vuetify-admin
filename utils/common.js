// cSpell:disable
// TODO: 建议axetroy的vscode-comment-autocomplete支持cSpell
// import {
//   isString,
//   isNonEmptyString,
//   isPureObject,
//   isUrl,
//   waitFor,
//   stripWhitespace,
//   timeout,
// } from '@nuxt/utils'
import get from 'lodash.get'

const objectToString = value => Object.prototype.toString.call(value)

// eslint-disable-next-line no-self-compare
const eq = (value, other) => value === other || (value !== value && other !== other)

const regexpRules = {
  isAccount: value => /^\w+$/.test(value),
  isDigital: value => /^\d+$/.test(value),
  isName: value => /^[\u4E00-\u9FA5A-Za-z\s]+(·[\u4E00-\u9FA5A-Za-z]+)*$/.test(value),
  isChineseName: value => /^[\u4E00-\u9FA5]+(·[\u4E00-\u9FA5]+)*$/.test(value),
  isEmail: value => /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value),
  isUrl: value => /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(value),
  isPhone: value => /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value),
  isID: value => /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(value),
}

// !如果需要建议引入useragent库
const userAgent = (value) => {
  const rules = {
    IE: /msie (\d+\.\d+)/i,
    CHROME: /chrome\/(\d+\.\d+)/i,
    FIREFOX: /firefox\/(\d+\.\d+)/i,
    OPERA: /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i,
    SAFARI: /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i,
    ANDROID: /android/i,
    IPAD: /ipad/i,
    IPHONE: /iphone/i,
    MAC_OS: /macintosh/i,
    WINDOWS: /windows/i,
    // eslint-disable-next-line no-useless-escape
    WEBAPP: /(nokia|iphone|android|ipad|motorola|^mot\-|softbank|foma|docomo|kddi|up\.browser|up\.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam\-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte\-|longcos|pantech|gionee|^sie\-|portalmmm|jig\s browser|hiptop|^ucweb|^benq|haier|^lct|opera\s*mobi|opera\*mini|320x320|240x320|176x220)/i,
    WEBKIT: /webkit/i,
  }
  let ua = 'UNKNOWN'
  if (!value) { return ua }
  for (const k in rules) {
    const rule = rules[k]
    if (rule.test(value)) {
      ua = k
      break
    }
  }
  return ua
}

export default {
  // isString,
  // isNonEmptyString,
  // isPureObject,
  // isUrl,
  // waitFor,
  // stripWhitespace,
  // timeout,
  objectToString,
  eq,
  get,
  regexpRules,
  userAgent,
}

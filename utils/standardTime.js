const standardTime = () => {
  let d = new Date(),
      str = '';
  str += d.getFullYear() + '.'; //获取当前年份
  d.getMonth() + 1 < 10 ? str += "0" + (d.getMonth() + 1) + "." : str += (d.getMonth() + 1) + "."
  d.getDate() < 10 ? str += "0" + d.getDate() + " " : str += d.getDate() + " "
  d.getHours() < 10 ? str += "0" + d.getHours() + ":" : str += d.getHours() + ":"
  d.getMinutes() < 10 ? str += "0" + d.getMinutes() : str += d.getMinutes()
  return str;
}

module.exports = standardTime

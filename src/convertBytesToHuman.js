/*
 * Функция `convertBytesToHuman` должна принимать
 * В этом задании надо разработать функцию
 * `convertBytesToHuman`. Эта функция  должна принимать
 * аргумент `bytes` только числового типа.
 * На выходе функция должна отдать
 * человекопонятную строку, которая будет
 * отражать размер файла. Примеры использования:
 * `convertBytesToHuman(1024) === '1 KB';`
 * `convertBytesToHuman(123123123) === '117.42 MB';`
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
*/

export default function convertBytesToHuman(bytes) {

  if ((typeof(bytes) !== "number") || (bytes < 0) || (bytes === Infinity)) {
    return false
  }

  let units = [' B', ' KB', ' MB', ' GB', ' TB', 'PB']
  let i = 0

  while (bytes >= 1024) {
    bytes /= 1024
    i++
  }

  bytes = (Math.round(bytes * 100) / 100).toString() + units[i]

  return bytes
}

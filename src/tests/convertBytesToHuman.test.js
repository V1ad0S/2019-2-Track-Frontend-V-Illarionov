/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== 1,
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === 5
 */

import convertBytesToHuman from "../convertBytesToHuman"


test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman(-1)).toBe(false)
  expect(convertBytesToHuman('string')).toBe(false)
  expect(convertBytesToHuman({ number: 12 })).toBe(false)
  expect(convertBytesToHuman(null)).toBe(false)
  expect(convertBytesToHuman(true)).toBe(false)
  expect(convertBytesToHuman(false)).toBe(false)
})

test('Возвращает false для Infinity', () => {
  expect(convertBytesToHuman(Infinity)).toBe(false)
})

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(5)).toBe('5 B')
  expect(convertBytesToHuman(0)).toBe('0 B')
  expect(convertBytesToHuman(123123123)).toBe('117.42 MB')
  expect(convertBytesToHuman(1024)).toBe('1 KB')
})



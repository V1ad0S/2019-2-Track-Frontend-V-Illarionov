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
  expect(convertBytesToHuman(undefined)).toBe(false)
})

test('Возвращает false для Infinity и NaN', () => {
  expect(convertBytesToHuman(Infinity)).toBe(false)
  expect(convertBytesToHuman(NaN)).toBe(false)
})

test('Возвращает false для чисел с плавающей точкой', () => {
  expect(convertBytesToHuman(1.25)).toBe(false)
})

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(5)).toBe('5 B')
  expect(convertBytesToHuman(0)).toBe('0 B')
  expect(convertBytesToHuman(123123123)).toBe('117.42 MB')
  expect(convertBytesToHuman(1024)).toBe('1 KB')
  expect(convertBytesToHuman(1125899906842624)).toBe('1 PB')
  expect(convertBytesToHuman(Math.pow(2, 80))).toBe('1 YB')
})



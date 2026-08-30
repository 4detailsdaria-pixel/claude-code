import { StyleSheet } from '@react-pdf/renderer';
import { brand } from '../config/theme';

export const s = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingBottom: 44,
    paddingHorizontal: 52,
    fontFamily: 'eUkraine',
    fontSize: 10,
    color: brand.black,
    backgroundColor: brand.white,
  },
  eyebrow: {
    fontFamily: 'eUkraineHead',
    fontWeight: 500,
    fontSize: 7.5,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: brand.grey,
  },
  h1: {
    fontFamily: 'eUkraineHead',
    fontWeight: 300,
    fontSize: 22,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    lineHeight: 1.25,
  },
  h2: {
    fontFamily: 'eUkraineHead',
    fontWeight: 300,
    fontSize: 15,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  quote: {
    fontFamily: 'eUkraineHead',
    fontWeight: 300,
    fontSize: 17,
    lineHeight: 1.4,
  },
  body: { fontSize: 10.5, lineHeight: 1.5 },
  small: { fontSize: 9, color: brand.grey, lineHeight: 1.45 },
  row: { flexDirection: 'row' },
  hr: { height: 1, backgroundColor: brand.line, marginVertical: 18 },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 52,
    right: 52,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 7.5,
    color: brand.grey,
  },
});

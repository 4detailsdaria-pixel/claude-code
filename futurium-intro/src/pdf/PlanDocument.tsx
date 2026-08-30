import { Document, Page, Text, View, Image, Link, Svg, Path } from '@react-pdf/renderer';
import type { ConsultationSession, Derived, FormatType, Level } from '../types';
import { LEVELS } from '../types';
import { brand } from '../config/theme';
import { levels, blockerCopy } from '../config/levels';
import { formats } from '../config/formats';
import { benefits } from '../config/benefits';
import { primaryCard, secondaryCard } from '../config/next-steps';
import { school, bookingUrlForPdf } from '../config/school';
import { recommendFormat } from '../lib/recommend';
import { deriveSkills } from '../screens/Screen3Goal';
import { formatDate, formatDateShort, addDays, formatPrice, monthWord, timesPerWeek, lessonsPerWeekPhrase } from '../lib/format';
import { lessonWord } from '../config/checkpoints';
import { stripEmoji } from './fonts';
import { s } from './styles';
import logo from '../assets/logo/futurium-full-black.png';

interface Props {
  session: ConsultationSession;
  derived: Derived;
}

/** Правки, зроблені на льоту, мають потрапляти і в PDF. */
const pick = (session: ConsultationSession, id: string, fallback: string) =>
  stripEmoji(session.edits[id] ?? fallback);

// ── Статична шкала рівнів ────────────────────────────────────────────
function LevelScalePdf({ current, target }: { current: Level; target: Level }) {
  const ci = LEVELS.indexOf(current);
  const ti = LEVELS.indexOf(target);
  const from = Math.min(ci, ti);
  const to = Math.max(ci, ti);
  const step = 100 / (LEVELS.length - 1);

  return (
    <View style={{ height: 40, position: 'relative', marginTop: 6 }}>
      <View
        style={{
          position: 'absolute',
          top: 6,
          left: 0,
          right: 0,
          height: 1.2,
          backgroundColor: brand.line,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 5.5,
          left: `${from * step}%`,
          width: `${(to - from) * step}%`,
          height: 2,
          backgroundColor: brand.black,
        }}
      />
      {LEVELS.map((lvl, i) => {
        const active = i === ci || i === ti;
        const size = active ? 12 : 5;
        return (
          <View key={lvl}>
            <View
              style={{
                position: 'absolute',
                left: `${i * step}%`,
                top: 6.5 - size / 2,
                marginLeft: -size / 2,
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor:
                  i === ci ? brand.yellow : i === ti ? brand.white : brand.line,
                border: active ? `1.2pt solid ${brand.black}` : undefined,
              }}
            />
            <Text
              style={{
                position: 'absolute',
                left: `${i * step}%`,
                top: 18,
                marginLeft: -9,
                width: 18,
                textAlign: 'center',
                fontFamily: 'eUkraineHead',
                fontSize: 8,
                letterSpacing: 0.8,
                color: active ? brand.black : brand.grey,
              }}
            >
              {lvl}
            </Text>
            {i === ci && <Caption left={i * step} label="ви зараз" />}
            {i === ti && ti !== ci && <Caption left={i * step} label="ваша ціль" />}
          </View>
        );
      })}
    </View>
  );
}

function Caption({ left, label }: { left: number; label: string }) {
  return (
    <Text
      style={{
        position: 'absolute',
        left: `${left}%`,
        top: 30,
        marginLeft: -26,
        width: 52,
        textAlign: 'center',
        fontSize: 7,
        color: brand.grey,
      }}
    >
      {label}
    </Text>
  );
}

function CheckMark() {
  return (
    <Svg width={11} height={11} viewBox="0 0 24 24">
      <Path
        d="M4 12.5 L9.5 18 L20 6.5"
        stroke={brand.black}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

function Footer({ page }: { page: string }) {
  return (
    <View style={s.footer} fixed>
      <Text>{school.name} · {school.tagline}</Text>
      <Text>{page}</Text>
    </View>
  );
}

// ── Документ ─────────────────────────────────────────────────────────
export function PlanDocument({ session, derived }: Props) {
  const levelCopy = levels[session.currentLevel];
  const working =
    session.blockers.length > 0
      ? session.blockers.map((b) => blockerCopy[b])
      : levelCopy.working;
  const skills = deriveSkills(session.goal, session.gaps);

  const auto = recommendFormat(session);
  const format = (session.recommendedFormat || auto.format) as FormatType;
  const reason = pick(session, 's5.reason', session.formatReason || auto.reason);

  const [lo, hi] = derived.estimatedMonths;
  const sameLevel = session.currentLevel === session.targetLevel;
  const estimate = sameLevel
    ? 'підтримуємо й поглиблюємо рівень'
    : `орієнтовно ${lo}–${hi} ${monthWord(hi)} при ${lessonsPerWeekPhrase(session.frequency)}`;

  return (
    <Document
      title={`Персональний план навчання · ${session.clientName}`}
      author={school.name}
      language="uk"
    >
      {/* ── Сторінка 1 · Про людину ─────────────────────────────── */}
      <Page size="A4" style={s.page}>
        <View style={[s.row, { justifyContent: 'space-between', alignItems: 'flex-start' }]}>
          <Image src={logo} style={{ height: 34 }} />
          <Text style={s.small}>{formatDate(session.createdAt)}</Text>
        </View>

        <View style={{ marginTop: 34 }}>
          <Text style={s.eyebrow}>Futurium</Text>
          <Text style={[s.h1, { marginTop: 8 }]}>Персональний{'\n'}план навчання</Text>
          <Text style={[s.body, { marginTop: 12, fontSize: 12 }]}>
            {session.clientName || '—'}
          </Text>
        </View>

        <View style={s.hr} />

        <Text style={s.eyebrow}>Ваш рівень</Text>
        <View style={{ marginTop: 10, marginBottom: 8 }}>
          <LevelScalePdf current={session.currentLevel} target={session.targetLevel} />
        </View>

        <View style={{ marginTop: 26 }}>
          <View
            style={{
              borderLeft: `2pt solid ${brand.yellow}`,
              paddingLeft: 14,
              paddingVertical: 4,
            }}
          >
            <Text style={s.quote}>
              «{pick(session, 's3.quote', session.clientQuote || '—')}»
            </Text>
          </View>
        </View>

        {skills.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Text style={s.eyebrow}>Це означає конкретно</Text>
            <View style={{ marginTop: 10 }}>
              {skills.map((skill, i) => (
                <View key={i} style={[s.row, { marginBottom: 6 }]}>
                  <View
                    style={{
                      width: 12,
                      height: 1.5,
                      backgroundColor: brand.black,
                      marginTop: 7,
                      marginRight: 9,
                    }}
                  />
                  <Text style={[s.body, { flex: 1 }]}>
                    {pick(session, `s3.skill.${i}`, skill)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={s.hr} />

        <View style={s.row}>
          <View style={{ flex: 1, paddingRight: 18 }}>
            <Text style={s.eyebrow}>Що ви вже вмієте</Text>
            <View style={{ marginTop: 10 }}>
              {levelCopy.can.map((item, i) => (
                <Bullet key={i} color={brand.yellow}>
                  {pick(session, `s2.can.${i}`, item)}
                </Bullet>
              ))}
            </View>
          </View>
          <View style={{ flex: 1, paddingLeft: 18 }}>
            <Text style={s.eyebrow}>Над чим працюємо</Text>
            <View style={{ marginTop: 10 }}>
              {working.map((item, i) => (
                <Bullet key={i} color={brand.periwinkle}>
                  {pick(session, `s2.working.${i}`, item)}
                </Bullet>
              ))}
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: 26,
            backgroundColor: brand.paper,
            borderRadius: 8,
            padding: 16,
          }}
        >
          <Text style={s.eyebrow}>Орієнтовний строк до цілі</Text>
          <Text style={{ fontSize: 13, marginTop: 7 }}>
            {session.currentLevel} → {session.targetLevel} · {pick(session, 's4.estimate', estimate)}
          </Text>
        </View>

        <Footer page="1 / 3" />
      </Page>

      {/* ── Сторінка 2 · План і умови ───────────────────────────── */}
      <Page size="A4" style={s.page}>
        <Text style={s.h2}>План і умови</Text>

        <View
          style={{
            marginTop: 20,
            backgroundColor: brand.periwinkle,
            borderRadius: 10,
            padding: 20,
          }}
        >
          <Text style={[s.eyebrow, { color: brand.black, opacity: 0.55 }]}>
            Рекомендований формат
          </Text>
          <Text
            style={{
              fontFamily: 'eUkraineHead',
              fontWeight: 300,
              fontSize: 20,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginTop: 8,
            }}
          >
            {formats[format].title}
          </Text>
          <Text style={{ fontSize: 12, marginTop: 6 }}>
            {timesPerWeek(session.frequency)}
          </Text>
          <Text style={[s.body, { marginTop: 12 }]}>{reason}</Text>
        </View>

        <View style={{ marginTop: 28 }}>
          <Text style={s.eyebrow}>Точки зрізу</Text>
          <View style={{ marginTop: 14, position: 'relative' }}>
            <View
              style={{
                position: 'absolute',
                top: 5,
                left: `${50 / derived.checkpoints.length}%`,
                right: `${50 / derived.checkpoints.length}%`,
                height: 1.2,
                backgroundColor: brand.line,
              }}
            />
            <View style={s.row}>
              {derived.checkpoints.map((p, i) => (
                <View key={p.lesson} style={{ flex: 1, alignItems: 'center' }}>
                  <View
                    style={{
                      width: 11,
                      height: 11,
                      borderRadius: 5.5,
                      backgroundColor: i === 0 ? brand.white : brand.yellow,
                      border: `1.2pt solid ${brand.black}`,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: 'eUkraineHead',
                      fontWeight: 500,
                      fontSize: 7.5,
                      letterSpacing: 1.2,
                      textTransform: 'uppercase',
                      marginTop: 9,
                    }}
                  >
                    {p.label}
                  </Text>
                  <Text
                    style={[
                      s.small,
                      { textAlign: 'center', marginTop: 5, paddingHorizontal: 6 },
                    ]}
                  >
                    {p.detail}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={s.hr} />

        <Text style={s.eyebrow}>Що входить у вартість</Text>
        <View style={{ marginTop: 12 }}>
          {benefits.map((b) => (
            <View key={b.title} style={[s.row, { marginBottom: 9 }]}>
              <View style={{ width: 18, marginTop: 1 }}>
                <CheckMark />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.body}>{b.title}</Text>
                {b.note && <Text style={[s.small, { marginTop: 2 }]}>{b.note}</Text>}
              </View>
            </View>
          ))}
        </View>

        <View
          style={{
            marginTop: 22,
            borderTop: `1pt solid ${brand.line}`,
            paddingTop: 18,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: 'eUkraineHead',
              fontWeight: 300,
              fontSize: 30,
              letterSpacing: 1.5,
            }}
          >
            {formatPrice(derived.monthlyPrice)} грн
          </Text>
          <Text style={[s.small, { marginTop: 5 }]}>на місяць</Text>
          <Text style={[s.small, { marginTop: 9 }]}>
            {formats[format].title} · {derived.lessonsPerMonth}{' '}
            {lessonWord(derived.lessonsPerMonth)} · {formatPrice(derived.pricePerLesson)} грн
            за заняття
          </Text>
        </View>

        <Footer page="2 / 3" />
      </Page>

      {/* ── Сторінка 3 · Дія ────────────────────────────────────── */}
      <Page size="A4" style={s.page}>
        <Text style={s.h2}>Наступні кроки</Text>

        <View
          style={{
            marginTop: 22,
            border: `1.5pt solid ${brand.black}`,
            borderRadius: 10,
            padding: 22,
          }}
        >
          <Text style={[s.eyebrow, { color: brand.black, fontSize: 8.5 }]}>
            {stripEmoji(primaryCard.eyebrow)}
          </Text>
          {primaryCard.body.map((line, i) => (
            <Text key={i} style={[s.body, { marginTop: i === 0 ? 12 : 5, fontSize: 11 }]}>
              {line}
            </Text>
          ))}
          <Text style={[s.small, { marginTop: 14 }]}>
            Актуально до {formatDateShort(addDays(session.createdAt, primaryCard.validForDays))}
          </Text>
          <Link src={bookingUrlForPdf} style={{ textDecoration: 'none' }}>
            <View
              style={{
                marginTop: 12,
                alignSelf: 'flex-start',
                backgroundColor: brand.black,
                borderRadius: 20,
                paddingVertical: 9,
                paddingHorizontal: 22,
              }}
            >
              <Text style={{ color: brand.white, fontSize: 10 }}>{primaryCard.cta}</Text>
            </View>
          </Link>
        </View>

        <View
          style={{
            marginTop: 16,
            backgroundColor: brand.paper,
            borderRadius: 10,
            padding: 20,
          }}
        >
          <Text style={s.eyebrow}>{stripEmoji(secondaryCard.eyebrow)}</Text>
          {secondaryCard.body.map((line, i) => (
            <Text key={i} style={[s.body, { marginTop: 9 }]}>
              {line}
            </Text>
          ))}
          <Text style={[s.small, { marginTop: 12 }]}>
            Актуально до{' '}
            {formatDateShort(addDays(session.createdAt, secondaryCard.validForDays))}
          </Text>
        </View>

        <View style={{ marginTop: 34 }}>
          <Text style={s.eyebrow}>Записатись</Text>
          <Link src={bookingUrlForPdf} style={{ fontSize: 10.5, marginTop: 7, color: brand.black }}>
            {school.bookingUrl}
          </Link>
        </View>

        <View style={{ marginTop: 22 }}>
          <Text style={s.eyebrow}>Контакти</Text>
          <Text style={[s.body, { marginTop: 7 }]}>
            Telegram {school.telegram} · Instagram {school.instagram}
          </Text>
          <Text style={s.body}>
            {school.email} · {school.site}
          </Text>
        </View>

        <View
          style={{
            marginTop: 44,
            borderTop: `1pt solid ${brand.line}`,
            paddingTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontFamily: 'eUkraineHead',
              fontWeight: 300,
              fontSize: 13,
              letterSpacing: 1.8,
            }}
          >
            {stripEmoji(school.signature)}
          </Text>
          <Image src={logo} style={{ height: 26 }} />
        </View>

        <Footer page="3 / 3" />
      </Page>
    </Document>
  );
}

function Bullet({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <View style={[s.row, { marginBottom: 6 }]}>
      <View
        style={{
          width: 5,
          height: 5,
          borderRadius: 2.5,
          backgroundColor: color,
          marginTop: 5.5,
          marginRight: 8,
        }}
      />
      <Text style={[s.body, { flex: 1 }]}>{children}</Text>
    </View>
  );
}

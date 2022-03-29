import React, { useState } from 'react';

function StatDiff({ sf = 0.05, r = 0 }) {
  const positivity = r >= 0 ? 'positive' : 'negative';
  let strength = 'no correlation';
  const abs = Math.abs(r);
  if (abs > 0.5) strength = `strong ${positivity} correlation`;
  else if (abs > 0.3) strength = `moderate ${positivity} correlation`;
  else if (abs > 0.1) strength = `weak ${positivity} correlation`;
  if (sf <= 0.05)
    return <span>There was a statistically significant, {strength}</span>;
  return <span>There was no statistically significant correlation</span>;
}

function Input({ label = '', value = '', setValue }) {
  return (
    <div>
      <label>{label}: </label>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}

export default function Spearman() {
  const [variable, setVariable] = useState({
    cont: 'score',
    ord: 'gender',
    sf: '0.012',
    sampleSize: '220',
    df: '2',
    r: '0.169',
  });

  const { cont, ord, sf, sampleSize, df, r } = variable;

  return (
    <div>
      <div>
        <Input
          label="Ordinal variable"
          value={ord}
          setValue={(ord) =>
            setVariable({
              ...variable,
              ord,
            })
          }
        />
        <Input
          label="Continous variable"
          value={cont}
          setValue={(cont) =>
            setVariable({
              ...variable,
              cont,
            })
          }
        />
        <Input
          label="Sample size"
          value={sampleSize}
          setValue={(sampleSize) =>
            setVariable({
              ...variable,
              sampleSize,
            })
          }
        />
        <Input
          label="Significance"
          value={sf}
          setValue={(sf) =>
            setVariable({
              ...variable,
              sf,
            })
          }
        />

        <Input
          label="Correlation"
          value={r}
          setValue={(r) =>
            setVariable({
              ...variable,
              r,
            })
          }
        />
        <Input
          label="Degree of freedom"
          value={df}
          setValue={(df) =>
            setVariable({
              ...variable,
              df,
            })
          }
        />
      </div>
      <hr />
      <div>
        <div>
          A Spearman's rank-order correlation was run to assess the relationship
          between {ord} and {cont}. Preliminary analysis showed the relationship
          to be monotonic, as assessed by visual inspection of a scatterplot.
        </div>
        <div>
          <StatDiff sf={sf} r={r} /> between {ord} and {cont}, $r_s(
          {sampleSize - df}) = {r}, p = {sf}$
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';

function Outlier({ n = 0 }) {
  if (!Number(n)) return <span> (a) no outliers, as assessed by boxplot;</span>;
  return (
    <span> (a) {n} outliers was found and kept, as assessed by boxplot;</span>
  );
}

function Homogeneity({ n = 0.051 }) {
  if (n < 0.05)
    return (
      <span>
        {' '}
        (c) there was no homogeneity of variances, as assessed by Levene's test
        for equality of variances.
      </span>
    );
  return (
    <span>
      {' '}
      (c) there was homogeneity of variances, as assessed by Levene's test for
      equality of variances.
    </span>
  );
}

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

export default function LinearCorrelation() {
  const [variable, setVariable] = useState({
    cont: 'score',
    cat: 'gender',
    sf: '0.012',
    outlier: '0',
    sampleSize: '220',
    df: '2',
    r: '0.169',
    levine: 0.51,
  });

  const { cont, cat, sf, outlier, sampleSize, df, r, levine } = variable;

  const percent = (Number(r) ** 2 * 100).toFixed(2);
  return (
    <div>
      <div>
        <Input
          label="Category variable"
          value={cat}
          setValue={(cat) =>
            setVariable({
              ...variable,
              cat,
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
          label="Levine sf"
          value={levine}
          setValue={(levine) =>
            setVariable({
              ...variable,
              levine,
            })
          }
        />
        <Input
          label="Outlier"
          value={outlier}
          setValue={(outlier) =>
            setVariable({
              ...variable,
              outlier,
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
          A Pearson's product-moment correlation was run to assess the
          relationship between {cat} and {cont}. Preliminary analyses showed
          there were <Outlier n={outlier} /> (b) {cont} was normally
          distributed, as assessed by visual inspection of Normal Q-Q plot of
          the {cont}; <Homogeneity n={levine} />
        </div>
        <div>
          <StatDiff sf={sf} r={r} /> between {cat} and {cont}, $r_(
          {sampleSize - df}) = {r}, p = {sf}$, with <span>{cat}</span>{' '}
          accounting for {percent}% of the variability in {cont}s.
        </div>
      </div>
    </div>
  );
}

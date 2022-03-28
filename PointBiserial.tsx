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

function StatDiff({ sf = 0.05 }) {
  if (sf <= 0.05)
    return <span>There was a statistically significant correlation</span>;
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
export default function PointBiserial() {
  const [variable, setVariable] = useState({
    cont: 'score',
    cat: 'gender',
    sf: '0.012',
    outlier: '0',
    firstCat: 'males',
    secondCat: 'females',
    sampleSize: '220',
    // df: '2',
    firstMean: '34.3',
    secondMean: '39.21',
    firstSD: '11.83',
    secondSD: '11.83',
    r: '0.169',
    levine: 0.51,
  });

  const {
    cont,
    cat,
    sf,
    outlier,
    firstCat,
    secondCat,
    sampleSize,
    // df,
    firstMean,
    secondMean,
    firstSD,
    secondSD,
    r,
    levine,
  } = variable;

  const percent = (Number(r) ** 2 * 100).toFixed(2);
  return (
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
      <div>
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
          label="First category"
          value={firstCat}
          setValue={(firstCat) =>
            setVariable({
              ...variable,
              firstCat,
            })
          }
        />
        <Input
          label="Second category"
          value={secondCat}
          setValue={(secondCat) =>
            setVariable({
              ...variable,
              secondCat,
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
          label="First mean"
          value={firstMean}
          setValue={(firstMean) =>
            setVariable({
              ...variable,
              firstMean,
            })
          }
        />
        <Input
          label="1st Standard deviation"
          value={firstSD}
          setValue={(firstSD) =>
            setVariable({
              ...variable,
              firstSD,
            })
          }
        />
        <Input
          label="Second mean"
          value={secondMean}
          setValue={(secondMean) =>
            setVariable({
              ...variable,
              secondMean,
            })
          }
        />

        <Input
          label="2nd Standard deviation"
          value={secondSD}
          setValue={(secondSD) =>
            setVariable({
              ...variable,
              secondSD,
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
      </div>
      <hr />
      <div>
        <div>
          A point-biserial correlation was run between {cat} and {cont}.
          Preliminary analyses showed there were <Outlier n={outlier} /> (b){' '}
          {cont} was normally distributed, as assessed by visual inspection of
          the Normal Q-Q plot of the {cont}; <Homogeneity n={levine} />
        </div>
        <div>
          <StatDiff sf={sf} /> between {cat} and {cont}, $r_{'{pb}'}(
          {sampleSize - 2}) = {r}, p = {sf}$, with {firstCat} having{' '}
          {firstMean > secondMean ? 'more' : 'less'} {cont} than {secondCat},
          *M* = {firstMean} (*SD* ={firstSD}) vs. *M* = {secondMean} (*SD* ={' '}
          {secondSD}).{' '}
          <span style={{ textTransform: 'capitalize' }}>{cat}</span> accounted
          for {percent}% of the variability in {cont}s.
        </div>
      </div>
    </div>
  );
}

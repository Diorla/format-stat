import React, { useState } from 'react';

function Input({ label = '', value = '', setValue, placeholder = '' }) {
  return (
    <div>
      <label>{label}: </label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

function Independent({ vars = [] }) {
  return (
    <span>
      {vars.map((item, idx) => {
        if (idx === vars.length - 1) return ` and ${item}`;
        if (idx === 0) return item;
        return `, ${item}`;
      })}
    </span>
  );
}

function Dependent({ name = '', type = 'category', expB = 0, dep }) {
  if (type === 'category') {
    if (expB < 0)
      return (
        <span>
          Later had {expB} times higher odds to exhibit {dep} than Initial.
        </span>
      );
    return (
      <span>
        Initial had {expB} times higher odds to exhibit {dep} than Later.
      </span>
    );
  }
  if (expB < 0)
    return (
      <span>
        Increasing {name} was associated with an decreased likelihood of
        exhibiting {dep}.
      </span>
    );
  return (
    <span>
      Increasing {name} was associated with an increased likelihood of
      exhibiting {dep}.
    </span>
  );
}

function PredList({ name = '', type = '', sf = 0, expB = 0, setValue }) {
  return (
    <div style={{ border: '1px solid silver', margin: 2 }}>
      <Input
        label="Name"
        value={name}
        setValue={(value) => setValue(value, 'name')}
      />
      <label htmlFor="">Type: </label>
      <select
        name="stat type"
        id="stats"
        value={type}
        onChange={(e) => setValue(e.target.value, 'type')}
      >
        <option value="continuous">Continous</option>
        <option value="category">Category</option>
      </select>
      <Input
        label="Significance"
        value={sf}
        setValue={(value) => setValue(value, 'sf')}
      />
      <Input
        label="ExpB"
        value={expB}
        setValue={(value) => setValue(value, 'expB')}
        placeholder="-0.58"
      />
    </div>
  );
}
export default function BLRegression() {
  const [variable, setVariable] = useState({
    cont: 'score',
    ord: 'gender',
    sf: '0.012',
    sampleSize: '220',
    df: '2',
    r: '0.169',
    dep: 'heart disease',
    zResidCount: 2,
    zResid: '3.14 and 4.45',
    nagelkerke: 0.045,
    // row-column
    ff: 10,
    ft: 20,
    tf: 30,
    tt: 40,
    total_percent: 50,
    false_percent: 60,
    true_percent: 70,
    predList: [
      {
        name: 'example',
        type: 'continuous',
        sf: 0.005,
        expB: -0.58,
      },
    ],
  });

  const {
    sf,
    sampleSize,
    df,
    r,
    dep,
    zResidCount,
    zResid,
    nagelkerke,
    ff,
    ft,
    tf,
    tt,
    total_percent,
    false_percent,
    true_percent,
    predList,
  } = variable;

  const sens = ((ft / (ft + tt)) * 100).toFixed(2);
  const spec = ((ff / (ff + tf)) * 100).toFixed(2);

  const sigList = predList
    .map((item) => {
      return item.sf < 0.05 ? item : null;
    })
    .filter((item) => !!item);
  return (
    <div>
      <div>
        {predList.map((item, idx) => (
          <PredList
            {...item}
            setValue={(value, type) => {
              setVariable({
                ...variable,
                predList: [
                  ...variable.predList.slice(0, idx),
                  {
                    ...variable.predList[idx],
                    [type]: value,
                  },
                  ...variable.predList.slice(idx + 1),
                ],
              });
            }}
          />
        ))}
        <button
          onClick={() =>
            setVariable({
              ...variable,
              predList: [
                ...variable.predList,
                {
                  name: '',
                  type: 'continuous',
                  sf: 0,
                  expB: 0,
                },
              ],
            })
          }
        >
          Add variable
        </button>
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
          label="Dependent variable"
          value={dep}
          setValue={(dep) =>
            setVariable({
              ...variable,
              dep,
            })
          }
        />
        <Input
          label="Number of residuals"
          value={zResidCount}
          setValue={(zResidCount) =>
            setVariable({
              ...variable,
              zResidCount,
            })
          }
        />
        <Input
          label="Residual values"
          value={zResid}
          setValue={(zResid) =>
            setVariable({
              ...variable,
              zResid,
            })
          }
        />
        <Input
          label="Total percent"
          value={total_percent}
          setValue={(total_percent) =>
            setVariable({
              ...variable,
              total_percent,
            })
          }
        />
        <Input
          label="False percent"
          value={false_percent}
          setValue={(false_percent) =>
            setVariable({
              ...variable,
              false_percent,
            })
          }
        />
        <Input
          label="True percent"
          value={true_percent}
          setValue={(true_percent) =>
            setVariable({
              ...variable,
              true_percent,
            })
          }
        />
        <Input
          label="Nagelkerke"
          value={nagelkerke}
          setValue={(nagelkerke) =>
            setVariable({
              ...variable,
              nagelkerke,
            })
          }
        />
        <Input
          label="Row false Col True"
          value={ft}
          setValue={(ft) =>
            setVariable({
              ...variable,
              ft,
            })
          }
        />
        <Input
          label="Row false Col false"
          value={ff}
          setValue={(ff) =>
            setVariable({
              ...variable,
              ff,
            })
          }
        />
        <Input
          label="Row true Col True"
          value={tt}
          setValue={(tt) =>
            setVariable({
              ...variable,
              tt,
            })
          }
        />
        <Input
          label="Row true Col false"
          value={tf}
          setValue={(tf) =>
            setVariable({
              ...variable,
              tf,
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
          Binomial logistic regression was performed to ascertain the effects of{' '}
          <Independent vars={predList.map((item) => item.name)} /> on the
          likelihood that participants have {dep}. There was {zResidCount}{' '}
          standardized residual with a value of {zResid} standard deviations,
          which was kept in the analysis. The logistic regression model was
          statistically significant, $χ^2(
          {sampleSize - df}) = {r}, p = {sf}$.
        </div>
        <div>
          The model explained {(nagelkerke * 100).toFixed(2)}% (Nagelkerke
          $R^2$) of the variance in {dep} and correctly classified{' '}
          {total_percent}% of cases. Sensitivity was {sens}%, specificity was{' '}
          {spec}%, positive predictive value was
          {true_percent}% and negative predictive value was {false_percent}%. Of
          the {predList.length} predictor variables, only {sigList.length} were
          statistically significant:{' '}
          <Independent
            vars={sigList.map((item) => `${item.name} (*p* = ${item.sf})`)}
          />
          .
        </div>
        <div>
          {sigList.map((item) => (
            <Dependent {...item} dep={dep} />
          ))}
        </div>
      </div>
    </div>
  );
}

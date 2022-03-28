import React, { useState } from 'react';

function CellFreq({ n = 0 }) {
  if (!n)
    return <span>All expected cell frequencies were greater than five.</span>;
  return <span>{n} cell frequencies were less than five.</span>;
}
function StatDiff({ sf = 0.05 }) {
  if (sf <= 0.05)
    return <span>There was a statistically significant association</span>;
  return <span>There was no statistically significant association</span>;
}

function Input({ label = '', value = '', setValue }) {
  return (
    <div>
      <label>{label}: </label>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}

function Association({ n = 0 }) {
  if (n > 0.5) return <span>There was a redundant association</span>;
  if (n >= 0.4) return <span>There was a very strong association</span>;
  if (n >= 0.3) return <span>There was a strong association</span>;
  if (n >= 0.2) return <span>There was a moderately strong association</span>;
  if (n >= 0.1) return <span>There was a weak association</span>;
  return <span>There was no association</span>;
}
export default function ChiSquare() {
  const [variable, setVariable] = useState({
    cont: 'score',
    cat: 'gender',
    sf: '0.012',
    df: '2',
    cellFreq: 0,
    phi: 0.322,
    chi: 0.292,
    // phiSf: 0.023,
  });

  const {
    cont,
    cat,
    sf,
    df,
    cellFreq,
    phi,
    chi,
    // phiSf
  } = variable;

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
          label="Degree of freedom"
          value={df}
          setValue={(df) =>
            setVariable({
              ...variable,
              df,
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
          label="cell frequencies below 5"
          value={cellFreq}
          setValue={(cellFreq) =>
            setVariable({
              ...variable,
              cellFreq,
            })
          }
        />
        <Input
          label="Chi"
          value={chi}
          setValue={(chi) =>
            setVariable({
              ...variable,
              chi,
            })
          }
        />
        <Input
          label="Phi"
          value={phi}
          setValue={(phi) =>
            setVariable({
              ...variable,
              phi,
            })
          }
        />

        {/* <Input
          label="Phi Significance"
          value={phiSf}
          setValue={(phiSf) =>
            setVariable({
              ...variable,
              phiSf,
            })
          }
        /> */}
      </div>
      <hr />

      <div>
        <div>
          A chi-square test for independence was conducted between {cat} and{' '}
          {cont}. <CellFreq n={cellFreq} /> <StatDiff sf={sf} /> between {cat}{' '}
          and {cont}, $\chi^2_{df} = {chi}, p = {sf}$. <Association n={phi} />{' '}
          between {cat} and {cont}, $φ = {phi}, p = {sf}$.
        </div>
      </div>
    </div>
  );
}

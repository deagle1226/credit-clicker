import React from 'react'
import map from 'lodash/map'

function ProgressBar({ value }) {
    return (
        <div className="outer">
            <div className="inner" style={{ width: `${value * 100}%`}} />
            <style jsx>{`
                .outer {
                    display: inline-block;
                    width: 100px;
                    height: 5px;
                    background: #eee;
                }
                .inner {
                    height: 5px;
                    background: #3ddb93;
                }
            `}</style>
        </div>
    )
}

function JobComponent({ job, updateFinances, updateJob, gameTime }) {
    return (
        <div style={{ border: '3px double black', textAlign: 'center', padding: '1rem' }}>
            <h3>Job Title: {job.title}</h3>
            <i>salary: ${job.salary}/day</i><br /><br />
            <button onClick={() => updateFinances('cash', job.wage)}>wage: ${job.wage}</button>

            <h4>Promotions</h4>
            <div>
                {map(job.promotions, (promotion, idx) => (
                    <div key={idx}>
                        {promotion.job.title}
                        <button onClick={() => {
                            updateJob(promotion)
                        }}>
                            {promotion.cost.cash && `$${promotion.cost.cash} training`}
                            {promotion.cost.credit && `, Credit: ${promotion.cost.credit}`}
                        </button>
                        {promotion.start && <ProgressBar value={Math.min(1, (gameTime - promotion.start) / (promotion.end - promotion.start))} /> }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default {
    Component: JobComponent
}

import React from 'react'

function JobComponent({ job, updateFinances }) {
    return (
        <div style={{ border: '3px double black', textAlign: 'center', padding: '1rem' }}>
            <h3>Job Title: {job.title}</h3>
            <i>salary: ${job.salary}/day</i><br /><br />
            <button onClick={() => updateFinances('cash', job.wage)}>wage: ${job.wage}</button>
        </div>
    )
}

export default {
    Component: JobComponent
}

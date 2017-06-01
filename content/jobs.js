export const MaximumWageEarner = {
    title: 'Maximum Wage Earner',
    wage: 20,
    salary: 2,
    promotions: []
}

export const MinimumBusinessOwner = {
    title: 'Minimum Business Owner',
    wage: 10,
    salary: 200,
    promotions: []
}

export const MediumWageEarner = {
    title: 'Medium Wage Earner',
    wage: 15,
    salary: 2,
    promotions: [
        {
            job: MaximumWageEarner,
            cost: {
                cash: 500,
                time: 5000
            }
        },
        {
            job: MinimumBusinessOwner,
            cost: {
                cash: 500,
                credit: 600,
                time: 10000
            }
        }
    ]
}

export const MinimumWageEarner = {
    title: 'Minimum Wage Earner',
    wage: 10,
    salary: 1,
    promotions: [
        {
            job: MediumWageEarner,
            cost: {
                cash: 250,
                time: 2000
            }
        }
    ]
}

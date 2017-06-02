export const UltraBusinessOwner = {
    title: 'Ultra Business Owner',
    wage: 50,
    salary: 10000,
    promotions: []
}

export const MaximumBusinessOwner = {
    title: 'Maximum Business Owner',
    wage: 20,
    salary: 5000,
    promotions: [
        {
            job: UltraBusinessOwner,
            cost: {
                cash: 5000,
                credit: 750,
                time: 50000
            }
        }
    ]
}

export const MediumBusinessOwner = {
    title: 'Medium Business Owner',
    wage: 15,
    salary: 2000,
    promotions: [
        {
            job: MaximumBusinessOwner,
            cost: {
                cash: 2000,
                credit: 700,
                time: 25000
            }
        }
    ]
}

export const UltraWageEarner = {
    title: 'Ultra Wage Earner',
    wage: 100,
    salary: 1000,
    promotions: []
}

export const MaximumWageEarner = {
    title: 'Maximum Wage Earner',
    wage: 20,
    salary: 2,
    promotions: [
        {
            job: UltraWageEarner,
            cost: {
                cash: 1500,
                time: 15000
            }
        }
    ]
}

export const MinimumBusinessOwner = {
    title: 'Minimum Business Owner',
    wage: 10,
    salary: 200,
    promotions: [
        {
            job: MediumBusinessOwner,
            cost: {
                cash: 1000,
                credit: 650,
                time: 15000
            }
        }
    ]
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

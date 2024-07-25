import {
    BriefcaseIcon,
    ChartBarIcon,
    PlayIcon,
    FolderIcon, 
    NewspaperIcon, 
    ComputerDesktopIcon, ClockIcon, CameraIcon, MoonIcon, PowerIcon,
    ArrowLongUpIcon, StopCircleIcon, 
} from "@heroicons/react/24/solid";
export const mergingaccts = [
    {
        title: "Merging Accounts",
        icon: FolderIcon,
        description:
        "We do not currently allow the combining of accounts. You are free to employ a trade copier within your accounts, but each trading account must be traded independently. At a later time, we might permit merging.",
    },
];
export const maxtradingcapital = [
    {
        title: "Maximum Trading Capital",
        icon: ChartBarIcon,
        description:
        "Any trader will be able to manage a maximum of $200,000 USD. The trader may include as many accounts as they like in this, but the total cannot exceed $200,000. As of right moment, our system is unable to identify or prevent traders from acquiring financing amounts greater than $200,000. As such, the trader bears all responsibility. Your profits on the most recent account that exceed the maximum funding will be canceled, and you will receive a 100% refund for the account purchase, provided that our compliance team manually verifies that you have purchased no more than $200K in funding at the time of withdrawal."
    }
];
export const waystofailachallenge = [
    {
        title: "Ways To Fail A Challenge",
        icon: PlayIcon,
        description: "You can only lose your funded account or fail the challenge in a handful different waysDaily drawdown rule: Abusing your account's daily drawdown limit. Please carefully study the details of our daily drawdown rule. The maximum drawdown regulation has been broken. Please carefully study the details of our general drawdown rule. If you want to engage in a forbidden trading strategy, carefully review the information in the section on prohibited strategies. ",
    },
];
export const newstrading = [
    {
        title: "News Trading",
        icon: NewspaperIcon,
        description: "You are free to hold trades during news events and open deals at any time during red folder news events during all evaluation phases.Profit from transactions opened or closed within 10 minutes of a high-impact red folder news item, however, will not be credited to your funded account. Profit deductions will occur from red folder news trading inside the 10-minute interval before and after, but account loss will not occur. Deductions for profits will be processed upon withdrawal request. Our go-to source for red folder news is Forex Factory. If the news is available all day, we make use of the MyFxBook form.",
    },
];
export const timelimits = [
    {
        title: "Time Limits",
        icon: ClockIcon,
        description: "Kisiki Capital has no minimum or maximum trading days. You can pass in 1 day or 1 year.",
    },
];
export const copytrading = [
    {
        title: "Copy Trading",
        icon: CameraIcon,
        description: "Since copy trading can be a helpful tool, we have created the following guidelines. The account from which the trades are coming must be yours and cannot be a demo account if you wish to employ a copy trader to send transactions into your Kisiki Capital account. Setting up a copy trader from a friend's, business partner's, or any other account that you do not own is prohibited. We'll want identification and documentation of account ownership. Please be aware that we don't take signal trades. It has to be your own trades. You need to remember that the copying tool needs to be connected to a static IP address.",
        
        end: `Account termination for noncompliance with the aforementioned copied trading restrictions will occur.`
    },
];
export const overnighttrades = [
    {
        title: "Overnight Trades",
        icon: MoonIcon,
        description: "The duration of a deal that you can hold during the week is unrestricted. It is crucial that you are aware that leaving trades open overnight will result in swap costs and possibly even spread volatility.",
    },
];
export const consistency = [
    {
        title: "Consistency",
        icon: PowerIcon,
        description: "We are imposing a consistency rule for a restricted period of time because we are permitting traders to pass with HFT bots. The consistency rule will also be removed whenever HFT is prohibited. For more information, please see below. For each withdrawal, traders must participate in a minimum of five trading days. We will examine your trading history and correct your balance for any trades that are outside of your trading range when you seek a withdrawal. You must first compute your average trade size in order to define your trading range.To get your average lot size, divide the entire amount of lots you have traded by the total number of trades that have been conducted.  For instance: 100 lots in all were exchanged. 50 deals were completed in total. 50 deals / 100 lots = 2 lots on average each trade. Check the table below to get your average lot size range. Bottom of your range is equal to Average Lot Size x 0.25. Maximum of your range is equal to Average Lot Size x 2.00. In the previous example, 2 x 0.25 = 0.5 Lots. Two times two is four lots. Thus, you have to trade in quantities between 0.5 and 4. When withdrawing funds, any trades that are outside of the range will be eliminated. Additionally, one trade cannot account for more than 33% of your profit because partial closures are a part of the initial operation. ",
    },
];
export const profitshare = [
    {
        title: "Profit Share & Payouts",
        icon: ArrowLongUpIcon,
        description: "The following payout schedule is applicable as soon as your account is funded: After 21 days following the first deal, the first compensation is eligible. Second payout for a fresh trading session within 21 days after the initial trade. Following the second payout, withdrawals are permitted for each subsequent trading session within 14 days following the first trade. The following profit-sharing scales 50% of Withdraw 1 Dividend Profit Withdrawal 2: 70% Take 3 = 80% Withdraw 4 = 90% You advance to our Kisiki Capital program after making four withdrawals, at which point you can request withdrawals seven days following your initial trade, along with a 100% profit share. Please be aware that each time you withdraw, you must take out 100% of your profits. ",
    },
];
export const weekendTrades = [
    {
        title: "Can I Hold Trades Over The Weekend",
        icon: ArrowLongUpIcon,
        description: "Throughout the evaluation stages, you are allowed to hold trades over the weekend. Once your account is funded, you are unable to hold over for the weekend. You risk losing your funded account and experiencing a hard breach if you don't finish your trades by Friday's market closing.",
    },
];
export const prohibitedTradingStrategies = [
    {
        title: "Prohibited Trading Strategies",
        icon: StopCircleIcon,
        description: "TNearly all trading methods are accepted at Kisiki Capital, but we are specifically seeking experienced traders with a strong understanding of managing risk and big sums of money. Traders attempting to manipulate the system or gamblers are not what we are searching for. These are the methods or approaches that we disapprove of. We acknowledge that our criteria are harder than most because we are an HFT-friendly firm, but this is because we run a higher risk of not being able to evaluate a trader's activity before going through the funding step.",
    },
];
export const easandbots = [
    {
        title: "EAs and Bots",
        icon: ComputerDesktopIcon,
        description: `The kinds of EAs and bots that can be used are restricted at Kisiki Capital, although we do permit the usage of some of them. Note that HFT bots are the only ones that can be employed during the challenge stages. Your financed live account will be deleted if you choose to utilize HFT bots.`,
        desctitle:` Banned EA categories: `,
        desc1:`1. Scalping News EAs - Automated trading systems designed to profit from price swings, particularly those that occur during news events, by making quick scalping trades.`,
        desc2:`2. Contrary to expectations EAs (Reverse and Latency): These are algorithms that use reverse trading or latency-related tactics to profit from price variations across several marketplaces or brokers, either through reverse trading or latency - related strategies.  `,
        desc3:`3. Multiple-Account Reverse Trading EA: Any type of mirror trading that operates in reverse, moving money from one account to another.`,
        desc4:`4. Tick Scalping: Bots that trade at a very fast pace in response to changes in prices at the tick level`,
        desc5: `5. EA’s designed to abuse demo servers: Any EA designed to exploit a demo server environment`,
        desc6: `6. If you intend to use an EA, we strongly advise that you use one that you have created yourself rather than one that is readily available on the mass market. Because of our stringent copy trading policy, which prohibits you from matching another trader's precise transactions, we advise you to make your EA as distinctive as you can.`, 
        end: `Account termination will occur for noncompliance with the aforementioned regulations.`,
    },
];


//Getting started data
export const propFirm = [
    {
        title: "What is a Prop Firm",
        icon: StopCircleIcon,
        description: "These kinds of businesses permit individual traders to transact using the capital of the company. The company typically charges a monthly fee for the use of the desk or software platform in exchange for a portion of the earnings. The term 'proprietary' denotes that, unlike in a regular brokerage, the firm's traders make transactions using the firm's money as opposed to client funds. Because the company is betting with its own money rather than that of its clients, this structure enables it to take on riskier wagers. In order to help traders learn about the markets and various trading methods, proprietary investment firms frequently provide instructional and training resources. These organizations are typically on the lookout for traders who can create winning strategies. ",
        desctitle: "Trading with a proprietary company like Kortana has the following advantages: ",
        desc1: "Capital Access: When they first begin trading, many traders do not have a substantial sum of money to invest. Traders have access to substantial amounts of money through the challenge model that they would not otherwise be able to trade.",
        desc2: "Risk reduction: When trading using the firm's funds, the trader does not put their own money at risk in the markets. The business takes on the loss on unsuccessful trades.",
        desc3: "Profit sharing: The trader receives a sizeable percentage of the earnings, typically between 70% and 90%. For savvy traders, this can be a great source of revenue. "

    },
];

//One phase challenges
export const profitsTargets = [
    {
        title: "Profit Targets",
        icon: StopCircleIcon,
        description: "To be eligible for funding as a trader with Kisiki Capital, you must be able to meet specific profit targets in our assessment tasks.",
        desctitle: "Trading with a proprietary company like Kortana has the following advantages: ",
        desc1: "Phase 1 Profit Objective: Considering the initial account amount, you have to make 8% profit. For instance, if you buy a $100,000 account challenge, you have to make $8,000 in closed profit and no active trades in order to go on to phase 2.",
    },
];
export const dailyLossRule = [
    {
        title: "Daily Loss Rule",
        icon: StopCircleIcon,
        description: "Maximum Daily Drawdown: We made every effort to provide the simplest drawdown guideline we could. The maximum Daily Drawdown Limit is fixed at 5% of your initial balance; it never increases or decreases.",
        desctitle: "Example : Your daily drawdown will be set at $5,000 if you have a $100,000 challenge.",
        desc1: "Day 1: Balance/Equity simulated starting day: $100,000. The daily allotment is $5,000 as usual, with a $95,000 equity breach threshold.",
        desc2: "Day 2: Balance/Equity at the beginning of the simulation: $110,000, $5,000 is the daily allotment; the equity breach threshold has been raised to $105,000. "
    },
];
export const maxLossRule = [
    {
        title: "Max Loss Rule",
        icon: StopCircleIcon,
        description: "We made an effort to make things very basic while crafting the industry's most rewarding and equitable maximum loss rule. You are not allowed to lose more than 10% of your initial amount; however, the likelihood of breaking this rule decreases as you accumulate more profit in your account. Let's take an example where you have a $100,000 account. You will only break this rule if the balance falls below $90,000. You might profitably balance your account to $150,000, for example, and lose up to $60,000 without ever going over the maximum loss allowed. However, kindly remember that breaking the daily loss rule will result in either the failure of a challenge or the deletion of your account.",
        desctitle: "You are not allowed to lose more than 10% of your initial amount; however, the likelihood of breaking this rule decreases as you accumulate more profit in your account.",
        desc1: "Let's take an example where you have a $100,000 account. You will only break this rule if the balance falls below $90,000. You might profitably balance your account to $150,000, for example, and lose up to $60,000 without ever going over the maximum loss allowed. However, kindly remember that breaking the daily loss rule will result in either the failure of a challenge or the deletion of your account."
    },
];
export const flexChallenge = [
    {
        title: "Flex Challenge",
        icon: StopCircleIcon,
        description: "The Flex challenge is exactly the same as the standard one-step express challenges.",
        desc1: "There is no longer a limit on the number of IPs you can trade from. You are free to trade from anywhere you like, but please be aware that this does not imply that we accept account management from any third parties. ",
        desc2: "The flex plan's 5% daily loss drawdown is a little bit different. Rather of relying on your balance from the prior day, it is now a trailing drawdown depending on your equity. The best way to comprehend it is by an example from real life."
    },
];
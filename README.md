//********************************************************************
//          General notes
// *******************************************************************

> Page called 'join' is the registration page, and on my side it is REGISTER PAGE
> There are 2 types of users: Manual, they DO NOT HAVE GOOGLEID, and Google users: they have googleID, so I can filter them out if needed (google users DO NOT have a password in their user name, instead they have google ID... hehehe)


//********************************************************************
//          User data:
// *******************************************************************

Name: M
last name: J
email: mj@me.com
pass: g*4%xPP_F{+k3.bN

Name: Dmitri
last: Summ
email: dmitri.summ@gmail.com
googleid: 

Name: Mike
last name: James
email: mike@james.com
pass: F,vdgAn<bE4-'V-(

Dmitri White from Google is also available



//********************************************************************
//          TEMP CODE
// *******************************************************************






//********************************************************************
//          BACK UP CODE
// *******************************************************************

    <div style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '400', fontSize: '30px', lineHeight: '45px', color: '#212529'}} >
    .
    </div>


  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 21px;
  line-height: 25px;
  color: #212529;





        let defaultCampaign = {address: "Ballybricken North, Kilmallock",
    dateCreated: "2021-10-20T00:00:00.000Z",
    howWillWeUseYourInvestment: ['Relative to its turnover, profit and contracted wo… to support current WIP repayable over 18 months.'],
    imageURL: "https://s3.eu-west-1.amazonaws.com/flender.avatar/uploads/campaign/avatar/5684/7d8232b7-1d02-49cb-ab3b-d6ad773b34e7.png",
    interestRateToDisplayOnACard: 10.95,
    latitudeLongitudeArray: [52.56793, -8.51393],
    nameOfCompany: "Halpin Complete Construction",
    ourStory: ['Pat Halpin is a qualified carpenter and formed Hal…d reputation for good quality work and finishing.', 'Since 2012, HCCs turnover has been increasing significantly year on year.', 'They require €32,000 for capital investment/working capital in the business going forward.'],
    projectDurationInMonthsJustTheNumber: 18,
    projectGrade: "C+",
    projectName: "5684-halpin-complete-construction-limited",
    projectNameToDisplayOnACard: "Halpin Complete Construction Limited",
    ribbonType: "projectgreen",
    totalAmountAsStringNoEuroSign: 32000,
    totalFunded: 19401.44,
    whyInvestInUs: ['Pat Halpin is a qualified carpenter and formed Hal…r has been increasing significantly year on year.', 'HCC operates a relatively low risk model, whereby …under contract thereby limiting its own exposure.', 'HCC has strong relationship with a number of main contractors and secures ongoing work from them.'],
    _id: "61d60cad8415a0b9ee9542fd"}




  const {projectName, projectNameToDisplayOnACard, nameOfCompany, imageURL, interestRateToDisplayOnACard, projectGrade, totalAmountAsStringNoEuroSign, totalFunded, projectDurationInMonthsJustTheNumber, riboonType, dateCreated, address, whyInvestInUs, howWillWeUseYourInvestment, ourStory, latitudeLongitudeArray} = filteredData;


<<<<<<<<<<<<<<<<<    PROJECT POST IN TO MONGODB   >>>>>>>>>>>>>>>>>


  app.post('/testpost', async (req,res)=> {

    console.log(req.body); 
    
    const postNewDataToMongo = new FinlendersDBPost({
        projectName: '5471-simon-ainscough-t-a-ainscaff-scaffolding-tranche-2',
        imageURL: 'https://s3.eu-west-1.amazonaws.com/flender.avatar/uploads/campaign/avatar/5471/2846b14c-66db-4ceb-b992-ea59983c0d79.png',
        projectNameToDisplayOnACard: 'Simon Ainscough t/a Ainscaff Scaffolding - Tranche 2',
        nameOfCompany: 'Simon Ainscough trading as Ainscaff scaffolding',
        interestRateToDisplayOnACard: 8.75,
        projectGrade: 'B',
        totalAmountAsStringNoEuroSign: 44000,
        totalFunded: 42398.32,
        projectDurationInMonthsJustTheNumber: 12,
        ribbonType: 'funded',
        dateCreated: '2021-06-04', 
        address: '100 Willow Park Grove, Dublin 11',
 
        whyInvestInUs: [
            'WThey have worked with a large range of clients both in the public and private sector including Dublin City Council,Monami construction, and John Paul construction.',
            'Ainscaff won the 2018 Build & Engineering Award for the Best Scaffold Company in Ireland'
        ], 
        howWillWeUseYourInvestment: [
            'Flender funds will be used to buy new scaffolding equipment which is required due to the onboarding of new contracts.'
        ],

        ourStory: [
            'We provide a professional service, supplying and delivering scaffold required for scaffolding any project, from DIY/ self-build, re-roofing, pharmaceutical, industrial and trade contracts. With the focus 100% on scaffolding, Ainscaff Scaffolding has no competing agendas or distractions, and only uses fully trained direct employees. Founded 10 years ago, we have amassed a wealth of knowledge and experience in the processes and construction of high-quality scaffolding. We have worked with a range of clients across different private and public business sectors in Ireland, including many large organisations such as Dublin City Council, Monami Construction, and John-Paul construction. We always do our best to ensure high-quality, reliable scaffolding.'
        ], 
        latitudeLongitudeArray: [53.392737172658876, -6.275412373011539]
    });

    postNewDataToMongo.save(); 
    res.send('data has been posted'); 

    // end of testPost
})




//********************************************************************
//          testing of sign-in page
// *******************************************************************

Email:
>entered nothing
>entered not email, but a string with no @symbol
>entered email that does NOT exist

Pass:
>entered nothing
>entered wrong pass
>entered pass that doesn't exist

Captcha:
>Tried to sumbit with NO captcha
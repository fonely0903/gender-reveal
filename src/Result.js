import React, { useEffect, useState } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import ReactApexChart from "react-apexcharts";
import Image from 'react-bootstrap/Image';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import './Result.css';

const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join('\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const PHOEBE_IMG_PATH = '/gender-reveal/Phoebe.gif';

const Result = props => {
    const [series, setSeries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showName, setShowName] = useState(false);
    const options = {
        chart: {
            type: 'bar',
            stacked: true,
            height: 150,
            stackType: '100%',
            toolbar: { show: false }
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        title: {
            text: '大家是怎麼猜的呢'
        },
        fill: {
            opacity: 1
        },
        stroke: { show: false },
        xaxis: {
            show: false,
            labels: { show: false },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: { show: false},
        grid: { show: false },
    }
    useEffect(() => {
        async function loadData() {
            const doc = new GoogleSpreadsheet(process.env.SHEET_ID, serviceAccountAuth);
            await doc.loadInfo();
            const sheet = doc.sheetsByIndex[0];
            await sheet.loadCells('F2:F3');
            const girls = sheet.getCellByA1('F2').value;
            const boys = sheet.getCellByA1('F3').value;
            setSeries([
                {name: 'Phoebe', data: [girls], color: '#dbc6cf'},
                {name: 'Jensen', data: [boys], color: '#a2ccd8'},
            ])
        }
        loadData()
    }, [])

    useEffect(() => {
        if (!isLoading) {
            setTimeout(() => {
                setShowName(true);
            }, 1670)
        }
    }, [isLoading])
    return (
        <>
            <div class='container-fluid text-center' id="container">
                <h2>可愛的小果仁是</h2>
                {isLoading ? (
                    <div className="count-down-timer">
                        <CountdownCircleTimer
                            isPlaying
                            duration={3}
                            colors={['#EECAD5', '#D1E9F6']}
                            colorsTime={[2, 0]}
                            onComplete={() => setIsLoading(false)}
                            size={180}
                        >
                            {({ remainingTime }) => <h1>{remainingTime}</h1>}
                        </CountdownCircleTimer>
                    </div>
                ) : (
                    <>
                        <div style={{height: '30px', marginTop: '16px'}}>
                            {showName && <h2 class="mt-3">Phoebe!</h2>} 
                        </div>
                        <Image src={PHOEBE_IMG_PATH} fluid className='mb-4' />
                        <ReactApexChart className='mt-4' options={options} series={series} type="bar" height={150} />
                    </>
                )}
            </div>
        </>
    );
};

Result.propTypes = {
    
};

export default Result;
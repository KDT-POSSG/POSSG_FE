import MyChart from "./MyChart";

function ImcomeReport(){

    return(
        <div className="imcome-content-wrap">
            <div className="imcome-title">손익 보고서</div>
            <div className="imcome-content">
                <div className="imcome-data-container">
                    <div className="imcome-data">
                        <label>총 수익</label>
                        <input type="text" className="imcome-data-input" />
                    </div>
                    <div className="imcome-data">
                        <label>총 비용</label>
                        <input type="text" className="imcome-data-input" />
                    </div>
                    <div className="imcome-data">
                        <label>총 이익</label>
                        <input type="text" className="imcome-data-input" />
                    </div>
                </div>
                <div className="imcome-chart">
                    <MyChart />
                </div>
            </div>
        </div>
    )
}
export default ImcomeReport;
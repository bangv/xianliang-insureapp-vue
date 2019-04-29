

const state = {



}
// 获取 state 数据
const getters = {

}

// 请求接口
const actions = {
    // 获取保司列表
    getCompanyList() {
        const params = {
            cityCode: this.markInfo.regionCode,
            salesPhone: this.salesPhone, // 电销业务员
            channel_user_id: this.businessParams.channel_user_id // 网销渠道ID
        };
        this.$http.getInsureCompany(params).then(res => {
            let companyList = res.data.data.map((item, index) => {
                item["showDetail"] = false;
                item["showVerificationCodeForm"] = false;
                item["index"] = index; // 存储当前保司索引
                this.getCustomQuoteInfoByCompanyCode(item);
                return item;
            });
        });
    },
    // 根据保司编码请求报价接口
    getCustomQuoteInfoByCompanyCode(params) {

        this.$http.getCustomQuoteInfo(params).then(res => {
            const plan = res.data[0];

            // 有报价id
            company["loaded"] = plan.id ? plan.id : true;
            if (plan.id) {
                plan["showCharge"] = false;
                this.getInsuranceCompanyDetail(company, plan);
            } else {
                // 除验证码出现使用上一次标志外都更新一遍
                if (plan["codeImg"] != "uselast") {
                    Object.assign(company, {
                        warnPlan: plan
                    });
                }
                this.$set(this.companys, company.index, company);
            }
            // this.sortCompanyList();
        });
    },
    // 通过报价成功ID获取保险详情

    getInsuranceCompanyDetail(company, plan) {
        const params = {
            Id: plan.id
        };
        this.$http.getInsuranceCompanyDetail(params).then(res => {
            // 报成功后清除之前未报成功的标志
            if (company.warnPlan) {
                company.warnPlan = null;
            }

            Object.assign(company, {
                planList: new Array(plan),
                detail: res.data
            });
            this.$set(this.companys, company.index, company);
        });
    },
}
// 接口返回数据后赋值给 state
const mutations = {


}

export default {
    state,
    getters,
    actions,
    mutations
}

// https://segmentfault.com/a/1190000009434398

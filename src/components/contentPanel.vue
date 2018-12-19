<template>
  <div class="contentPanel o-a">
    <div class="panelLeft f-l">
      <el-form v-if='isRule' :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <h1 class='ruleTitle'>规则录入</h1>
        <el-form-item label="系统名称" prop="SysName" class='formItem'>
          <el-select v-model="ruleForm.SysName" filterable placeholder="请选择系统" clearable style='width: 70%'>
            <el-option
            v-for="item in system"
            :key="item.value"
            :label="item.label"
            :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模块名称" prop="ModuleName" class='formItem'>
          <el-select v-model="ruleForm.ModuleName" filterable placeholder="请选择模块" clearable style='width: 70%'>
            <el-option
            v-for="item in Sysmodule"
            :key="item.value"
            :label="item.label"
            :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="功能名称" prop="FunName" class='formItem'>
          <el-select v-model="ruleForm.FunName" filterable placeholder="请选择功能" clearable style='width: 70%'>
            <el-option
            v-for="item in Sysfunction"
            :key="item.value"
            :label="item.label"
            :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-alert title="规则录入模块" type="success" :closable="false" style='margin: 15px 0;width: 90%'></el-alert>
        <el-form-item label="规则名称" prop="name" class='formItem'>
          <el-input v-model="ruleForm.name" placeholder='请输入案例名称'></el-input>
        </el-form-item>
        <el-form-item label="用户" prop="user" class='formItem'>
          <el-input v-model="ruleForm.user" placeholder='请输入用户名'></el-input>
        </el-form-item>
        <el-form-item label="渠道" prop="canal" class='formItem'>
                <!-- <el-select v-model="ruleForm.canal"
                  multiple
                  filterable
                  default-first-option
                  placeholder="请选择渠道" style='width: 70%'>
                  <el-option v-for='item in canalArr'
                    :key='item.value'
                    :label='item.label'
                    :value='item.label'>
                  </el-option>
                </el-select> -->
                <el-select v-model="ruleForm.canal"
                filterable
                default-first-option
                clearable
                placeholder="请选择渠道" style='width: 70%'>
                <el-option v-for='item in canalArr'
                :key='item.value'
                :label='item.label'
                :value='item.label'>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户行为" prop="behavior" class='formItem'>
            <el-input v-model="ruleForm.behavior" placeholder='请输入用户行为'></el-input>
          </el-form-item>
          <el-form-item label="条件" prop="Prerequisite" class='formItem'>
            <el-select v-model="ruleForm.Prerequisite"
              multiple
              filterable
              allow-create
              default-first-option
              @visible-change='hiddeDrop'
              placeholder="请输入前提条件" 
              style='width: 100%'>
              <!-- <el-option></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间" prop='time' class='formItem'>
            <el-time-picker
              is-range
              arrow-control
              v-model="ruleForm.time"
              value-format="yyyy-MM-dd hh:mm:ss"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围">
            </el-time-picker>
          </el-form-item>
          <el-form-item label="结果" prop="result" class='formItem'>
            <el-input v-model="ruleForm.result" placeholder='请输入结果'></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">保存规则</el-button>
            <el-button @click="editCase('ruleForm')">案例编辑</el-button>
          </el-form-item>
        </el-form>
      <!-- 案例编辑 -->
      <el-form v-if='!isRule' :model="caseForm" :rules="caserules" ref="caseForm" label-width="100px" class="demo-ruleForm">
        <h1 class='ruleTitle'>案例编辑</h1>
        <el-form-item label="规则名称" class='formItem'>
          <el-input v-model="ruleName" disabled placeholder='请输入案例名称'></el-input>
        </el-form-item>
        <el-alert title="案例步骤" type="warning" :closable="false" style='margin: 15px 0;width: 90%'></el-alert>
        <el-form-item prop='Steps' label-width="0px">
            <div v-for='(item,index) in StepLength' class='stepPanel'>
                <el-form-item style='margin:15px 0 0 30px'>
                  <el-tag type="primary">步骤{{index+1}}</el-tag>
                </el-form-item>
                <el-form-item label='操作页面' class='stepItem d-ib' style='margin-bottom: 0'>
                  <el-select v-model="caseForm.Steps[index].Page" filterable placeholder="请选择操作页面" 
                  @change="jionDes(index)"
                  clearable style='width: 70%'>
                    <el-option
                    v-for="item in pages"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                    </el-option>
                  </el-select>
                </el-form-item> 
                <el-form-item v-show='StepLength.length >1' class='d-ib ta-c c-p' style='width: 18%'>
                  <i class="el-icon-delete deleteBtn " @click='deleteStep(index)' title='删除步骤'></i>
                </el-form-item>
                <el-form-item label='操作元素' class='stepItem'>
                  <el-select v-model="caseForm.Steps[index].Dom" filterable placeholder="请选择操作元素" 
                  @change="jionDes(index)"
                  clearable style='width: 70%'>
                    <el-option
                    v-for="item in dom"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label='操作类型' class='stepItem'>
                  <el-select v-model="caseForm.Steps[index].Type" filterable placeholder="请选择操作类型" 
                  @change="jionDes(index)"
                  clearable style='width: 70%'>
                    <el-option
                    v-for="item in Type"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label='取值' class='stepItem'>
                  <el-input v-model="caseForm.Steps[index].theValue" 
                  @input="jionDes(index)"
                  clearable placeholder="请输入取值"></el-input>
                </el-form-item>
                <el-form-item label='预期结果' class='stepItem'>
                  <el-input v-model="caseForm.Steps[index].expectResult" 
                  @input="jionDes(index)"
                  clearable placeholder="请输入预期结果"></el-input>
                </el-form-item>
                <el-form-item label='步骤描述' class='stepItem'>
                  <el-input 
                    type="textarea" :rows="3"
                    v-model="caseForm.Steps[index].stepDes"
                    placeholder="请输入步骤描述">
                  </el-input>
                </el-form-item>
            </div>
        </el-form-item>

        <el-form-item label-width="0px">
          <el-button type="success" plain round @click="addStep()">
            <i class='fa fa-plus'></i>
            <span>添加</span>
          </el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="submitCase('caseForm')">保存案例</el-button>
          <el-button type='warning' @click="nextCase('caseForm')" plain>下一条案例编辑</el-button>
          <el-button @click="returnRule">返回规则录入</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="panelRight f-r">
      <!-- <h2 class="rightTile">场景描述</h2> -->
      <p class ='rightText'>
        <span>系统：</span>
        {{ruleForm.SysName}}
      </p>
      <p class ='rightText'>
        <span>模块：</span>
      {{ruleForm.ModuleName}}</p>
      <p class ='rightText'>
        <span>功能：</span>
        {{ruleForm.FunName}}
      </p>
      <div class="textRule">
        <h2 class='tileRule'>规则名称为：{{ruleForm.name||'<待填写>'}}</h2>
        <p class="ruleLine">
          用户为<span>{{ruleForm.user||'<待填写>'}}</span>，
          在<span>{{ruleForm.canal||'<待填写>'}}</span>中进行
          <span>{{ruleForm.behavior||'<待填写>'}}</span>，账户状态
          <span>{{ ruleForm.Prerequisite[0] ||'<待填写>'}}</span>，在交易时间
          <span>{{ruleForm.time[0]||'<待填写>'}}</span>至<span>{{ruleForm.time[1]||'<待填写>'}}</span>内，
          <span v-for='item in ruleForm.Prerequisite.slice(1)'>如{{item}}，</span>
          结果为<span>{{ruleForm.result||'<待填写>'}}。</span>
        </p>
      </div>
      
      <div v-if='!isRule' class="rightText">
        <h2 class='tileRule' style="margin: 35px 0 10px 0">案例名称</h2>
        <el-input
          placeholder="请输入案例名称"
          v-model="nameCase"
          clearable>
        </el-input>
        <h2 class='tileRule' style="margin: 15px 0 10px 0">案例描述</h2>
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入案例描述"
          v-model="caseDes">
        </el-input>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      var validateSteps = (rule, arr, callback) => {
        var flag = true;
        for(var i in arr){
          if(!(arr[i].theValue&&arr[i].expectResult)){
            flag = false;
            callback(new Error('案例步骤不能为空！'));
          }
        }
        if(flag){
          callback();
        }
      };
      return {
        isRule:true,
        ruleName:'',
        StepLength:[1],//默认存在一个步骤
        stepArr:[],//存储案例步骤数组
        caseArr:[],//案例存储
        nameCase:'',// 案例名称
        caseDes:'',// 案例描述
        stepObj:{}, //步骤对象
        // 系统名称
        system: [{
          value: '11',
          label: '手机银行'
        }, {
          value: '12',
          label: '公司网银'
        }, {
          value: '13',
          label: '个人网银'
        }, {
          value: '14',
          label: '理财系统'
        }, {
          value: '15',
          label: '薪金宝'
        }],
        // 模块
        Sysmodule: [{
          value: '11',
          label: '境内汇款'
        }, {
          value: '12',
          label: '境外汇款'
        }, {
          value: '13',
          label: '转账'
        }, {
          value: '14',
          label: '理财'
        }],
        // 功能
        Sysfunction: [{
          value: '11',
          label: '实时转账'
        }, {
          value: '12',
          label: '普通转账'
        }, {
          value: '13',
          label: '次日转账'
        }, {
          value: '14',
          label: '实时批量转账'
        }],
        // 渠道
        canalArr:[{
          value:'1',
          label:'个人网银'
        },{
          value:'2',
          label:'手机银行'
        },{
          value:'3',
          label:'电子银行'
        }],
        // 前提条件
        Prerequisite:[{

        }],
        ruleForm: {
          SysName:'',
          ModuleName:'',
          FunName:'',
          name: '',
          user: '',
          canal: '',
          Prerequisite:[],
          behavior:'',
          time:'',
          result:''
        },
        rules: {
          SysName:[
          { required: true, message: '请选择系统', trigger: 'change' }
          ],
          ModuleName:[
          { required: true, message: '请选择模块', trigger: 'change' }
          ],
          FunName:[
          { required: true, message: '请选择功能', trigger: 'change' }
          ],
          name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          user: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
          ],
          canal: [
          { required: true, message: '请选择渠道', trigger: 'change' }
          ],
          Prerequisite: [
          { type: 'array', required: true, message: '请输入前提条件', trigger: 'change' }
          ],
          behavior: [
          { required: true, message: '请输入用户行为', trigger: 'blur' }
          ],
          time: [
          { required: true, message: '请选择时间', trigger: 'change' }
          ],
          result: [
          { required: true, message: '请输入结果', trigger: 'blur' }
          ]
        },
        pages:[{
          value:'1',
          label:'签到界面'
        },{
          value:'2',
          label:'取款界面'
        }],
        dom:[{
          value:'1',
          label:'用户名'
        },{
          value:'2',
          label:'密码'
        },{
          value:'3',
          label:'登录'
        },{
          value:'4',
          label:'卡号'
        },{
          value:'5',
          label:'金额'
        }],
        Type:[{
          value:'1',
          label:'输入'
        },{
          value:'2',
          label:'点击'
        }],
        caseForm: {
          Steps:[
            {
              Page:'',
              Dom:'',
              Type:'',
              theValue:'',
              expectResult:'',
              stepDes:''
            }
          ]
        },
        caserules:{
          Steps:[
              { validator: validateSteps, trigger: 'change'}
          ],
        }
      };
    },
    created(){
      this.ruleForm.SysName = this.system[0].label;
      this.ruleForm.ModuleName = this.Sysmodule[0].label;
      this.ruleForm.FunName = this.Sysfunction[0].label;
    },
    mounted(){
      this.caseForm.Steps[0].Page = this.pages[0].label;
      this.caseForm.Steps[0].Dom = this.dom[0].label;
      this.caseForm.Steps[0].Type = this.Type[0].label;
      // this.stepObj.stepDes = '在'+this.stepObj.Page+'页面，通过'+this.stepObj.Type+this.stepObj.Dom+',取值为'+
      //   this.stepObj.theValue+',预期结果为'+this.stepObj.expectResult+'。';
      // this.$set(this.caseForm.Steps,0,this.stepObj);
    },
    methods: {
      hiddeDrop(flag){
        console.log(flag);
        var select = document.getElementsByClassName('el-select-dropdown el-popper is-multiple');
        console.log(select[0])
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message({
              message: '规则保存成功',
              type: 'success'
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 进入案例编辑
      editCase(formName) {
        this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isRule = false;
          this.ruleName = this.ruleForm.name;
        } else {
          console.log('error submit!!');
          return false;
        }});
      },
      // 拼接步骤
      jionDes(i){
        this.caseForm.Steps[i].stepDes = '在'+this.caseForm.Steps[i].Page+'页面，通过'+this.caseForm.Steps[i].Type+
        this.caseForm.Steps[i].Dom+',取值为'+this.caseForm.Steps[i].theValue+',预期结果为'+this.caseForm.Steps[i].expectResult+'。';
      },
      // 增加步骤
      addStep(){
        var length = this.StepLength.length;
        var obj = {Page:this.pages[0].label,
          Dom:this.dom[0].label,
          Type:this.Type[0].label,
          theValue:'',
          expectResult:'',
          stepDes:''
        };
        this.$set(this.caseForm.Steps,length,obj);
        this.StepLength.push(1);
      },
      // 删除步骤
      deleteStep(i){
        if(this.StepLength.length > 1){
          this.caseForm.Steps.splice(i,1);
          this.StepLength.splice(i,1);
        }
      },
      // 提交步骤
      submitCase(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.stepArr.push(this.caseForm.Steps);
            this.$message({
              message: '案例保存成功',
              type: 'success'
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 进入下一条案例编辑
      nextCase(formName){
        this.submitCase(formName);
        this.StepLength = [1];
        this.caseForm.Steps = [{
          Page:this.pages[0].label,
          Dom:this.dom[0].label,
          Type:this.Type[0].label,
          theValue:'',
          expectResult:'',
          stepDes:''
        }];
        // 情况案例描述和案例名称
        var obj = {name:this.nameCase,des:this.caseDes};
        this.caseArr.push(obj);
        this.nameCase = '';
        this.caseDes = '';
      },
      // 返回规则录入页面
      returnRule() {
        this.isRule = true;
      }
    }
  }
</script>
<style lang="less">
  .panelLeft{
    .el-popper{
      display: none;
    }
  }
</style>
<style lang='less' scoped>
  .contentPanel{
    height: 100%;
    padding:20px 30px;
    .panelLeft{
      box-sizing: border-box;
      width: 65%;
      border-right: 1px dashed #ccc;
      .ruleTitle{
        font-size: 22px;
        line-height: 40px;
        margin-bottom: 20px;
      }
      .formItem{
        width: 70%;
      }
      .stepPanel{
        width: 80%;
        border:1px dotted #dfdfdf;
        .stepItem{
          width: 80%;
          margin: 10px 0;
        }
        .deleteBtn{
          color:#F56C6C;
          font-size: 20px;
          line-height: 40px;
        }
      }
    }
    .panelRight{
      box-sizing: border-box;
      width: 35%;
      padding-left:20px;
      .rightTile{
        line-height: 40px;
        font-size: 20px;
      }
      .rightText{
        line-height: 26px;
        font-size: 14px;
        span{
          font-size: 16px;
          font-weight: 700;
        }
      }
      .textRule{
        padding:20px 10px 20px 0;
        .tileRule{
          font-size: 16px;
          padding:2px 0 12px 0;
        }
        .ruleLine{
          font-size: 14px;
          line-height: 30px;
          span{
            font-weight: 600;
          }
        }
      }
    }
  }
</style>

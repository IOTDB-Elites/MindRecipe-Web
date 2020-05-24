<template>
  <div class="info-wrapper">


    <h1>个人空间</h1>

    <el-form :model="UserInfo" ref="UserInfo" labelPosition="top">
      <div class="left-form-wrapper">

        <el-form-item label="用户名" prop="username">
          <el-input prefix-icon="el-icon-user-solid" :disabled="true" v-model="UserInfo.name"></el-input>
        </el-form-item>

        <el-form-item label="地区" prop="region">
          <el-input  prefix-icon="el-icon-location" :disabled="true" v-model="UserInfo.region"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input  prefix-icon="el-icon-s-promotion" v-model="UserInfo.email"></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="phone">
          <el-input prefix-icon="el-icon-phone" v-model="UserInfo.phone"></el-input>
        </el-form-item>

        <el-form-item label="系别" prop="dept">
          <el-input prefix-icon="el-icon-s-home" v-model="UserInfo.dept"></el-input>
        </el-form-item>
      </div>

      <div class="right-form-wrapper">
        <el-form-item label="性别" prop="gender">
          <el-radio v-model="UserInfo.gender" label="male">男生</el-radio>
          <el-radio v-model="UserInfo.gender" label="female">女生</el-radio>
        </el-form-item>

        <el-form-item label="语言" prop="language">
          <el-radio v-model="UserInfo.language" label="zh">中文</el-radio>
          <el-radio v-model="UserInfo.language" label="en">英文</el-radio>
        </el-form-item>

        <el-form-item label="年级" prop="grade">
          <el-select v-model="UserInfo.grade" placeholder="Please choose">
            <el-option
              v-for="item in grades"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="角色" prop="role">
          <el-select v-model="UserInfo.role" placeholder="Please choose">
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="标签" prop="preferTags" class="tags-wrapper">
          <el-tag
            :key="tag"
            v-for="tag in UserInfo.preferTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ Add</el-button>
        </el-form-item>

        <!--<el-form-item label="Credits" prop="credits">-->
          <!--<el-input :disabled="true" v-model="UserInfo.credits"></el-input>-->
        <!--</el-form-item>-->

        <div class="sign-in-button-wrapper">
          <el-button type="text" @click="submitForm('UserInfo')">更 新</el-button>
        </div>
      </div>


    </el-form>


  </div>

</template>

<script>
  import {Button, Input, Form, FormItem, Message, InputNumber, Select, Option, Radio, Cascader, Tag} from 'element-ui'
  import {mapActions, mapState} from 'vuex'

  export default {
    name: 'user-info',
    components: {
      elButton: Button,
      elInput: Input,
      elForm: Form,
      elFormItem: FormItem,
      elInputNumber: InputNumber,
      elSelect: Select,
      elOption: Option,
      elRadio: Radio,
      elCascader: Cascader,
      elTag: Tag
    },
    data() {
      return {
        UserInfo: {
          name: this.user.name,
          region: this.user.region,
          gender: this.user.gender,
          email: this.user.email,
          phone: this.user.phone,
          dept: this.user.dept,
          grade: this.user.grade,
          language: this.user.language,
          role: this.user.role,
          preferTags: [this.user.preferTags],
          credits: this.user.obtainedCredits,
        },
        roles: [{
          value: 'role0',
          label: '初级'
        }, {
          value: 'role1',
          label: '中级'
        }, {
          value: 'role2',
          label: '高级'
        }],
        grades: [{
          label: '一年级',
          value: 'grade1'
        }, {
          label: '二年级',
          value: 'grade2'
        }, {
          label: '三年级',
          value: 'grade3'
        }, {
          label: '四年级',
          value: 'grade4'
        }, {
          label: '五年级',
          value: 'grade5'
        }],
        inputVisible: false,
        inputValue: ''
      }
    },
    props: ['user'],
    methods: {
      ...mapActions('auth', [
        'editUserInfo'
      ]),
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      handleClose(tag) {
        this.UserInfo.preferTags.splice(this.UserInfo.preferTags.indexOf(tag), 1)
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.UserInfo.preferTags.push(inputValue)
        }
        this.inputVisible = false;
        this.inputValue = ''
      },
      submitForm(data) {
        this.$refs[data].validate((valid) => {
          if (valid) {
            this.editUserInfo({
              userInfo: {
                id: this.user.id,
                uid: this.user.uid,
                timestamp: this.user.timestamp,
                name: this.UserInfo.name,
                region: this.UserInfo.region,
                gender: this.UserInfo.gender,
                email: this.UserInfo.email,
                phone: this.UserInfo.phone,
                dept: this.UserInfo.dept,
                grade: this.UserInfo.grade,
                language: this.UserInfo.language,
                role: this.UserInfo.role,
                preferTags: this.UserInfo.preferTags.join(', '),
                obtainedCredits: this.user.obtainedCredits
              },
              onSuccess: (success) => {
                Message.success('更新成功!')
              },
              onError: (error) => {
                Message.error(error)
              }
            })
          } else {
            Message.error('请填入正确信息')
          }
        })
      }
    }
  }
</script>

<style scoped src="./UserInfo.css"></style>

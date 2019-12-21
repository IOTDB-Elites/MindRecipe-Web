<template>
  <div class="info-wrapper">


    <h1>个人信息</h1>

    <el-form :model="UserInfo" :rules="rules" ref="UserInfo" labelPosition="top">
      <div class="left-form-wrapper">

        <el-form-item label="用户名" prop="username">
          <el-input :disabled="true" v-model="UserInfo.username"></el-input>
        </el-form-item>

        <el-form-item label="邮箱账号" prop="email">
          <el-input v-model="UserInfo.email"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input v-model="UserInfo.phone"></el-input>
        </el-form-item>

        <el-form-item label="年龄（1至70岁之间）" prop="age">
          <el-input-number v-model="UserInfo.age" @change="" :min="1" :max="70"
                           label="年龄"></el-input-number>
        </el-form-item>

        <el-form-item label="城市" prop="options">
          <el-select v-model="UserInfo.city" placeholder="请选择">
            <el-option
              v-for="item in cities"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

      </div>

      <div class="right-form-wrapper">

        <el-form-item label="性别" prop="gender">
          <el-radio v-model="UserInfo.gender" label="男">男</el-radio>
          <el-radio v-model="UserInfo.gender" label="女">女</el-radio>
        </el-form-item>

        <el-form-item class="profession-selection" label="专业" prop="options">
          <el-cascader
            expand-trigger="hover"
            :options="UserInfo.professions"
            v-model="UserInfo.profession"
            @change="">
          </el-cascader>
        </el-form-item>

        <el-form-item label="学历" prop="options">
          <el-select v-model="UserInfo.degree" placeholder="请选择">
            <el-option
              v-for="item in degrees"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="工作经验（年）" prop="experience">
          <el-input-number v-model="UserInfo.experience" @change="" :min="0" :max="50" :step="0.5"
                           label="经验"></el-input-number>
        </el-form-item>

        <el-form-item label="技能" prop="age" class="tags-wrapper">
          <el-tag
            :key="tag"
            v-for="tag in UserInfo.skillTags"
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
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增</el-button>

        </el-form-item>

        <div class="sign-in-button-wrapper">
          <el-button type="text" @click="submitForm('UserInfo')">修改</el-button>
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
      let checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入邮箱账号'))
        } else {
          callback()
        }
      };
      let validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      };
      return {
        activeName: 'first',
        UserInfo: {
          password: '',
          username: this.user.username,
          email: this.user.email ? '' : this.user.email,
          phone: this.user.telephone,
          age: this.user.age,
          city: this.user.city,
          gender: this.user.sex === 1 ? '男' : '女',
          degree: this.user.diploma,
          experience: this.user.experience,
          profession: this.user.major === null ? [] : this.user.major.split(','),
          skillTags: this.user.skill === null ? [] : this.user.skill.split(','),
        },
        cities: [{
          value: 'Beijing',
          label: 'Beijing'
        }, {
          value: 'HongKong',
          label: 'HongKong'
        }],
        inputVisible: false,
        inputValue: '',
        selectedOption: [],
        rules: {
          password: [
            {validator: validatePassword, trigger: 'blur'}
          ],
          username: [
            {validator: checkUsername, trigger: 'blur'}
          ]
        }
      }
    },
    props: ['user'],
    methods: {
      ...mapActions('auth', [
        'editUserInfo'
      ]),
      showInput() {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      handleClose(tag) {
        this.UserInfo.skillTags.splice(this.UserInfo.skillTags.indexOf(tag), 1)
      },
      handleInputConfirm() {
        let inputValue = this.inputValue
        if (inputValue) {
          this.UserInfo.skillTags.push(inputValue)
        }
        this.inputVisible = false
        this.inputValue = ''
      },
      submitForm(data) {
        console.log(this.$refs[data])
        this.$refs[data].validate((valid) => {
          if (valid) {
            console.log('sign up !')
            this.editUserInfo({
              userInfo: {
                username: this.UserInfo.username,
                email: this.UserInfo.email,
                telephone: this.UserInfo.phone,
                sex: this.UserInfo.gender === '男' ? 1 : 0,
                age: this.UserInfo.age,
                experience: this.UserInfo.experience,
                city: this.UserInfo.city,
                diploma: this.UserInfo.degree,
                major: this.UserInfo.profession.join(','),
                skill: this.UserInfo.skillTags.join(',')
              },
              onSuccess: (success) => {
                Message.success('修改成功！')
              },
              onError: (error) => {
                Message.error(error)
              }
            })
          } else {
            Message.error('请正确填写信息！')
          }
        })
      }
    }
  }
</script>

<style scoped src="./UserInfo.css"></style>

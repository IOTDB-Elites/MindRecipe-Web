<template>
  <div class="auth-wrapper">

    <div class="right-form-wrapper">
      <img src="../../assets/img/login3.jpeg" height="100%"/>
    </div>

    <div class="left-form-wrapper">
      <h1>登 录</h1>

      <el-form :model="LoginForm" :rules="rules" ref="LoginForm" labelPosition="top">

        <el-form-item label="城市" prop="district">
          <el-select v-model="LoginForm.district">
            <el-option value="Beijing" label="北京"></el-option>
            <el-option value="Hong Kong" label="香港"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" prop="username">
          <el-input v-model="LoginForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="LoginForm.password" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <div class="go-sign-up">
            <span>还没有账号?</span>
            <el-button
              type="text"
              @click="goToRegisterPage"
            >
              去 注 册
            </el-button>
          </div>
          <div class="sign-in-button-wrapper">
            <el-button type="text" @click="submitForm('LoginForm')">登 录</el-button>
          </div>
        </el-form-item>

      </el-form>

    </div>

  </div>
</template>

<script>
  import {Button, Input, Form, FormItem, Select, Option, Message} from 'element-ui'
  import {router} from '../../main'
  import {mapActions, mapState} from 'vuex'

  export default {
    name: 'login-form-page',
    components: {
      elButton: Button,
      elInput: Input,
      elForm: Form,
      elFormItem: FormItem,
      elSelect: Select,
      elOption: Option,
      Message
    },
    data() {
      let checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入用户名'))
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
        LoginForm: {
          password: '',
          username: '',
          district: 'Beijing'
        },
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
    computed: {
      ...mapState('auth', {
        user: state => state.user
      })
    },
    methods: {
      ...mapActions('auth', [
        'signIn'
      ]),
      goToRegisterPage() {
        router.push({name: 'RegisterPage'})
      },
      submitForm(data) {
        this.$refs[data].validate((valid) => {
          if (valid) {
            this.signIn({
              name: this.LoginForm.username,
              region: this.LoginForm.district,
              onSuccess: (success) => {
                Message.success('欢迎, ' + this.LoginForm.username + '!');
                router.push({name: 'IndexPage'})
              },
              onError: (error) => {
                Message.error(error)
              }
            })
          } else {
            Message.error('请检查你的用户名或地区')
          }
        })
      }
    }
  }
</script>

<style scoped src="./LoginForm.css"></style>

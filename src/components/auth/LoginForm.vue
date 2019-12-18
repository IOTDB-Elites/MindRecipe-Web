<template>
  <div class="auth-wrapper">

    <div class="left-form-wrapper">
      <h1>登&nbsp;&nbsp;录</h1>

      <el-form :model="LoginForm" :rules="rules" ref="LoginForm" labelPosition="top">

        <el-form-item label="用户名" prop="username">
          <el-input v-model="LoginForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="LoginForm.password" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <div class="go-sign-up">
            <span>还没有账号？</span>
            <el-button
              type="text"
              @click="goToRegisterPage"
            >
              去注册
            </el-button>
          </div>
          <div class="sign-in-button-wrapper">
            <el-button type="text" @click="submitForm('LoginForm')">登录</el-button>
          </div>
        </el-form-item>

      </el-form>

    </div>

    <div class="right-form-wrapper">
      <img src="../../assets/img/login3.jpeg" height="100%"/>
    </div>

  </div>
</template>

<script>
  import {Button, Input, Form, FormItem, Message} from 'element-ui'
  import {router} from '../../main'
  import {mapActions, mapState} from 'vuex'

  export default {
    name: 'login-form-page',
    components: {
      elButton: Button,
      elInput: Input,
      elForm: Form,
      elFormItem: FormItem,
      Message
    },
    data() {
      let checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }
      let validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      return {
        activeName: 'first',
        LoginForm: {
          password: '',
          username: '',
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
            console.log('sign in !')
            this.signIn({
              body: this.LoginForm,
              onSuccess: (success) => {
                Message({
                  message: '欢迎，' + success + '！',
                  type: 'success'
                })
                router.push({name: 'UserHomePage'})
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

<style scoped src="./LoginForm.css"></style>

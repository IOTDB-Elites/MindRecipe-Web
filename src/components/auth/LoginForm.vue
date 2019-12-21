<template>
  <div class="auth-wrapper">

    <div class="left-form-wrapper">
      <h1>Sign in</h1>

      <el-form :model="LoginForm" :rules="rules" ref="LoginForm" labelPosition="top">

        <el-form-item label="City" prop="district">
          <el-select v-model="LoginForm.district">
            <el-option value="Beijing" label="Beijing"></el-option>
            <el-option value="Hong Kong" label="Hong Kong"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="User name" prop="username">
          <el-input v-model="LoginForm.username"></el-input>
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <el-input type="password" v-model="LoginForm.password" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <div class="go-sign-up">
            <span>No Account?</span>
            <el-button
              type="text"
              @click="goToRegisterPage"
            >
              Go to sign up
            </el-button>
          </div>
          <div class="sign-in-button-wrapper">
            <el-button type="text" @click="submitForm('LoginForm')">Sign in</el-button>
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
          return callback(new Error('Please enter user name'))
        } else {
          callback()
        }
      };
      let validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter password'))
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
              onSuccess: (success) => {
                Message({
                  message: 'Welcome, ' + username + '！',
                  type: 'success'
                });
                router.push({name: 'UserHomePage'})
              },
              onError: (error) => {
                Message.error(error)
              }
            })
          } else {
            Message.error('User name or password not correct!')
          }
        })
      }
    }
  }
</script>

<style scoped src="./LoginForm.css"></style>

<template>
  <div class="auth-wrapper">

    <div class="right-wrapper">
      <img src="../../assets/img/login2.jpeg" height="100%"/>
    </div>

    <div class="left-form-wrapper">
      <h1>注 册</h1>

      <el-form :model="registerForm" :rules="rules" ref="registerForm" labelPosition="top">

        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>

        <!--<el-form-item label="E-mail" prop="email">-->
        <!--<el-input v-model="registerForm.email"></el-input>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="Phone number" prop="phone">-->
        <!--<el-input v-model="registerForm.phone"></el-input>-->
        <!--</el-form-item>-->

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="registerForm.confirmPassword" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <div class="go-sign-in">
            <span>已有账号？</span>
            <el-button
              type="text"
              @click="goToLoginPage"
            >
              去 登 录
            </el-button>
          </div>
          <div class="sign-in-button-wrapper">
            <el-button type="text" @click="submitForm('registerForm')">注 册</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {Button, Input, Form, FormItem, Radio, InputNumber, Select, Option, Tag, Cascader, Message} from 'element-ui'
  import {router} from '../../main'
  import {mapActions} from 'vuex'

  export default {
    name: 'register-form-page',
    components: {
      elButton: Button,
      elInput: Input,
      elForm: Form,
      elFormItem: FormItem,
      elRadio: Radio,
      elInputNumber: InputNumber,
      elSelect: Select,
      elOption: Option,
      elTag: Tag,
      elCascader: Cascader
    },
    data() {
      let checkUsername = (rule, value, callback) => {
        if (!value || value.length === 0) {
          return callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      };
      let checkEmail = (rule, value, callback) => {
        if (!value || value.length === 0) {
          return callback(new Error('Please enter e-mail'))
        } else if (!/^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i.test(value)) {
          return callback(new Error('Please enter correct e-mail format'))
        } else {
          callback()
        }
      };
      let checkPhone = (rule, value, callback) => {
        if (!value || value.length === 0) {
          return callback(new Error('Please enter phone number'))
        } else if (!/^1[34578]\d{9}$/.test(value)) {
          return callback(new Error('Please enter correct phone number format'))
        } else {
          callback()
        }
      };
      let validatePassword = (rule, value, callback) => {
        if (!value || value.length === 0) {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      };
      let validateConfirmPassword = (rule, value, callback) => {
        if (!value || value.length === 0) {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.registerForm.password) {
          callback(new Error('密码不一致!'))
        } else {
          callback()
        }
      };

      return {
        rules: {
          password: [
            {required: true, validator: validatePassword, trigger: 'blur'}
          ],
          phone: [
            {required: true, validator: checkPhone, trigger: 'blur'}
          ],
          username: [
            {required: true, validator: checkUsername, trigger: 'blur'}
          ],
          email: [
            {required: true, validator: checkEmail, trigger: 'blur'}
          ],
          confirmPassword: [
            {required: true, validator: validateConfirmPassword, trigger: 'blur'}
          ]
        },
        registerForm: {
          username: '',
          password: '',
          confirmPassword: '',
        },
      }
    },
    methods: {
      goToLoginPage() {
        router.push({name: 'LoginPage'})
      },
      submitForm(data) {
        this.$refs[data].validate((valid) => {
          if (valid) {
            Message.success('注册成功, 请登录')
            router.push({name: 'LoginPage'})
          } else {
            Message.error('请正确填入信息')
          }
        })
      }
    }
  }
</script>

<style scoped src="./RegisterForm.css"></style>

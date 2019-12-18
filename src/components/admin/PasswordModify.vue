<template>
  <div class="password-wrapper">

    <h1>修改密码</h1>

    <el-form :model="userPassword" :rules="rules" ref="userPassword" labelPosition="top">

      <el-form-item label="原密码" prop="oldPassword">
        <el-input type="password" v-model="userPassword.oldPassword"></el-input>
      </el-form-item>

      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="userPassword.newPassword"></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="userPassword.confirmPassword"></el-input>
      </el-form-item>

    </el-form>

    <div class="sign-in-button-wrapper">
      <el-button type="text" @click="submitForm('userPassword')">修改</el-button>
    </div>

  </div>

</template>

<script>
  import {Button, Input, Form, FormItem, Message} from 'element-ui'
  import {mapActions} from 'vuex'
  import {router} from '../../main'

  export default {
    name: 'password-modify',
    components: {
      elButton: Button,
      elInput: Input,
      elForm: Form,
      elFormItem: FormItem,
      Message
    },
    data() {
      let validateOldPassword = (rule, value, callback) => {
        if (!value || value.length === 0) {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      let validateNewPassword = (rule, value, callback) => {
        if (!value || value.length === 0) {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      let validateConfirmPassword = (rule, value, callback) => {
        if (!value || value.length === 0) {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.userPassword.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        userPassword: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        rules: {
          oldPassword: [
            {required: true, validator: validateOldPassword, trigger: 'blur'}
          ],
          newPassword: [
            {required: true, validator: validateNewPassword, trigger: 'blur'}
          ],
          confirmPassword: [
            {required: true, validator: validateConfirmPassword, trigger: 'blur'}
          ]
        },
      }
    },
    methods: {
      ...mapActions('auth', [
        'modifyPassword'
      ]),
      submitForm(data) {
        console.log(this.$refs[data])
        this.$refs[data].validate((valid) => {
          if (valid) {
            this.modifyPassword({
              passwordInfo: {
                oldPassword: this.userPassword.oldPassword,
                newPassword: this.userPassword.newPassword
              },
              onSuccess: (success) => {
                Message.success(success)
                this.userPassword.oldPassword = ''
                this.userPassword.newPassword = ''
                this.userPassword.confirmPassword = ''
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

<style scoped src="./PasswordModify.css"></style>

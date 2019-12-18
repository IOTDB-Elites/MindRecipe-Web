<template>
  <div class="auth-wrapper">

    <div class="left-form-wrapper">
      <h1>注&nbsp;&nbsp;册</h1>

      <el-form :model="registerForm" :rules="rules" ref="registerForm" labelPosition="top">

        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>

        <!--<el-form-item label="邮箱账号" prop="email">-->
        <!--<el-input v-model="registerForm.email"></el-input>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="手机号" prop="phone">-->
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
              去登录
            </el-button>
          </div>
          <div class="sign-in-button-wrapper">
            <el-button type="text" @click="submitForm('registerForm')">注册</el-button>
          </div>
          <!--<el-button @click="resetForm('signInForm')">重置</el-button>-->
        </el-form-item>
      </el-form>


    </div>


    <div class="right-wrapper">
      <img src="../../assets/img/login2.jpeg" height="100%"/>
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
      }
      let checkEmail = (rule, value, callback) => {
        if (!value || value.length === 0) {
          return callback(new Error('请输入邮箱账号'))
        } else if (!/^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i.test(value)) {
          return callback(new Error('请输入正确的邮箱格式'))
        } else {
          callback()
        }
      }
      let checkPhone = (rule, value, callback) => {
        if (!value || value.length === 0) {
          return callback(new Error('请输入手机号'))
        } else if (!/^1[34578]\d{9}$/.test(value)) {
          return callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
      let validatePassword = (rule, value, callback) => {
        if (!value || value.length === 0) {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      let validateConfirmPassword = (rule, value, callback) => {
        if (!value || value.length === 0) {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }

      return {
        activeName: 'first',
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
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          gender: '男',
          age: 20,
          experience: 0,
          city: '北京',
          degree: '本科',
          skillTags: ['文学', '销售', '经营'],
          profession: ['哲学', '哲学类'],
          professions: [{
            value: '哲学',
            label: '哲学',
            children: [{
              value: '哲学类',
              label: '哲学类',
            }]
          }, {
            value: '经济学',
            label: '经济学',
            children: [{
              value: '经济学类',
              label: '经济学类',
            }]
          }, {
            value: '法学',
            label: '法学',
            children: [{
              value: '马克思主义理论类',
              label: '马克思主义理论类'
            }, {
              value: '社会学类',
              label: '社会学类'
            }, {
              value: '政治学类',
              label: '政治学类'
            }, {
              value: '公安学类',
              label: '公安学类'
            }]
          }, {
            value: '教育学',
            label: '教育学',
            children: [{
              value: '教育学类',
              label: '教育学类'
            }, {
              value: '体育学类',
              label: '体育学类'
            }]
          }, {
            value: '历史学',
            label: '历史学',
            children: [{
              value: '历史学类',
              label: '历史学类'
            }]
          }, {
            value: '文学',
            label: '文学',
            children: [{
              value: '中国语言文学类',
              label: '中国语言文学类'
            }, {
              value: '外国语言文学类',
              label: '外国语言文学类'
            }, {
              value: '新闻传播学类',
              label: '新闻传播学类'
            }, {
              value: '艺术类',
              label: '艺术类'
            }]
          }, {
            value: '理学',
            label: '理学',
            children: [{
              value: '数学类',
              label: '数学类'
            }, {
              value: '物理学类',
              label: '物理学类'
            }, {
              value: '化学类',
              label: '化学类'
            }, {
              value: '生物科学类',
              label: '生物科学类'
            }, {
              value: '天文学类',
              label: '天文学类'
            }, {
              value: '地质学类',
              label: '地质学类'
            }, {
              value: '地理科学类',
              label: '地理科学类'
            }, {
              value: '地球物理学类',
              label: '地球物理学类'
            }, {
              value: '大气科学类',
              label: '大气科学类'
            }, {
              value: '海洋科学类',
              label: '海洋科学类'
            }, {
              value: '力学',
              label: '力学'
            }, {
              value: '电子信息科学类',
              label: '电子信息科学类'
            }, {
              value: '材料科学类',
              label: '材料科学类'
            }, {
              value: '环境科学类',
              label: '环境科学类'
            }, {
              value: '心理学类',
              label: '心理学类'
            }, {
              value: '统计学类',
              label: '统计学类'
            }]
          }, {
            value: '工学',
            label: '工学',
            children: [{
              value: '地矿类',
              label: '地矿类'
            }, {
              value: '材料类',
              label: '材料类'
            }, {
              value: '机械类',
              label: '机械类'
            }, {
              value: '仪器仪表类',
              label: '仪器仪表类'
            }, {
              value: '能源动力类',
              label: '能源动力类'
            }, {
              value: '电气信息类',
              label: '电气信息类'
            }, {
              value: '土建类',
              label: '土建类'
            }, {
              value: '水利类',
              label: '水利类'
            }, {
              value: '测绘类',
              label: '测绘类'
            }, {
              value: '环境与安全类',
              label: '环境与安全类'
            }, {
              value: '化学与制药类',
              label: '化学与制药类'
            }, {
              value: '交通运输类',
              label: '交通运输类'
            }, {
              value: '海洋工程类',
              label: '海洋工程类'
            }, {
              value: '轻工纺织食品类',
              label: '轻工纺织食品类'
            }, {
              value: '航空航天类',
              label: '航空航天类'
            }, {
              value: '武器',
              label: '武器'
            }, {
              value: '农业工程类',
              label: '农业工程类'
            }, {
              value: '林业工程类',
              label: '林业工程类',
            }, {
              value: '公安技术类',
              label: '公安技术类',
            }, {
              value: '工程力学类',
              label: '工程力学类',
            }, {
              value: '生物工程类',
              label: '生物工程类',
            }]
          }, {
            value: '农学',
            label: '农学',
            children: [{
              value: '植物生产类',
              label: '植物生产类',
            }, {
              value: '草业科学类',
              label: '草业科学类',
            }, {
              value: '森林资源类',
              label: '森林资源类',
            }, {
              value: '森林生产类',
              label: '森林生产类',
            }, {
              value: '动物生产类',
              label: '动物生产类',
            }, {
              value: '动物医学类',
              label: '动物医学类',
            }, {
              value: '水产类',
              label: '水产类',
            }]
          }, {
            value: '医学',
            label: '医学',
            children: [{
              value: '基础医学类',
              label: '基础医学类',
            }, {
              value: '预防医学类',
              label: '预防医学类',
            }, {
              value: '临床医学与医学技术类',
              label: '临床医学与医学技术类',
            }, {
              value: '口腔医学类',
              label: '口腔医学类',
            }, {
              value: '中医学类',
              label: '中医学类',
            }, {
              value: '法医学类',
              label: '法医学类',
            }, {
              value: '护理学类',
              label: '护理学类',
            }, {
              value: '药学类',
              label: '药学类',
            }]
          }, {
            value: '管理学',
            label: '管理学',
            children: [{
              value: '管理科学与工程类',
              label: '管理科学与工程类',
            }, {
              value: '工商管理类',
              label: '工商管理类',
            }, {
              value: '公共管理类',
              label: '公共管理类',
            }, {
              value: '农业经济管理类',
              label: '农业经济管理类',
            }, {
              value: '图书档案学类',
              label: '图书档案学类',
            }]
          }]
        },
        cities: [{
          value: '选项1',
          label: '北京'
        }, {
          value: '选项2',
          label: '上海'
        }, {
          value: '选项3',
          label: '广州'
        }, {
          value: '选项4',
          label: '南京'
        }, {
          value: '选项5',
          label: '西安'
        }],
        degrees: [
          {
            value: '选项1',
            label: '专科'
          }, {
            value: '选项2',
            label: '本科'
          }, {
            value: '选项3',
            label: '硕士'
          }, {
            value: '选项4',
            label: '博士'
          }
        ],
        inputVisible: false,
        inputValue: '',
        selectedOption: [],
      }
    },
    methods: {
      ...mapActions('auth', [
        'signUp',
        'editUserInfo'
      ]),
      goToLoginPage() {
        router.push({name: 'LoginPage'})
      },
      handleClose(tag) {
        this.registerForm.skillTags.splice(this.registerForm.skillTags.indexOf(tag), 1)
      },

      showInput() {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },

      handleInputConfirm() {
        let inputValue = this.inputValue
        if (inputValue) {
          this.registerForm.skillTags.push(inputValue)
        }
        this.inputVisible = false
        this.inputValue = ''
      },
      submitForm(data) {
        console.log(this.$refs[data])
        this.$refs[data].validate((valid) => {
          if (valid) {
            console.log('sign up !')
            this.signUp({
              body: {
                username: this.registerForm.username,
                password: this.registerForm.password
              },
              onSuccess: (success) => {
//                this.editUserInfo({
//                  userInfo: {
//                    username: this.registerForm.username,
//                    email: this.registerForm.email,
//                    telephone: this.registerForm.phone,
//                    sex: this.registerForm.gender === '男' ? 1 : 0,
//                    age: this.registerForm.age,
//                    experience: this.registerForm.experience,
//                    city: this.registerForm.city,
//                    diploma: this.registerForm.degree,
//                    major: this.registerForm.profession[this.registerForm.profession.length - 1],
//                    skill: this.registerForm.skillTags.join(',')
//                  },
//                  onSuccess: (success) => {
//                    Message.success('注册成功！')
//                  },
//                  onError: (error) => {
//                    Message.error(error)
//                  }
//                })
                Message.success('注册成功！请登录后完善个人信息！')
                router.push({name: 'LoginPage'})
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

<style scoped src="./RegisterForm.css"></style>

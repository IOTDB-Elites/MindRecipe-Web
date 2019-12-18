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
          value: '北京',
          label: '北京'
        }, {
          value: '上海',
          label: '上海'
        }, {
          value: '南京',
          label: '南京'
        }],
        degrees: [
          {
            value: '专科',
            label: '专科'
          }, {
            value: '本科',
            label: '本科'
          }, {
            value: '硕士',
            label: '硕士'
          }, {
            value: '博士',
            label: '博士'
          }
        ],
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

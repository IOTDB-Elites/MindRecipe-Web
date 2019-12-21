<template>
  <div class="nav-wrapper">
    <div class="container">
      <div class="left-wrapper" @click="goToIndexPage">
        <!--<img src="../../assets/img/icon.png" width="30">-->
        <span class="icon-text el-icon-notebook-1"> Mind Recipe</span>
      </div>

      <div class="right-wrapper">
        <div class="input-wrapper">
          <el-input class="search-input"
                    placeholder=""
                    v-model="keyword"
          >
            <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch"></i>
          </el-input>
        </div>

        <div class="button-wrapper">

          <!--v-if="user === null"-->
          <div>
            <el-button type="text" @click="goToLoginPage">Sign in</el-button>
            <el-button type="text" @click="goToRegisterPage">Sign up</el-button>
          </div>

          <!--<div>-->
            <!--<el-dropdown placement="bottom-start" @command="handleCommand">-->
            <!--<span class="el-dropdown-link">test<i class="el-icon-caret-bottom el-icon&#45;&#45;right"></i>-->
            <!--</span>-->
              <!--<el-dropdown-menu slot="dropdown">-->
                <!--<el-dropdown-item command="UserHomePage">Update Info</el-dropdown-item>-->
                <!--<el-dropdown-item command="signOut">Log off</el-dropdown-item>-->
              <!--</el-dropdown-menu>-->
            <!--</el-dropdown>-->
          <!--</div>-->

        </div>
      </div>

    </div>
  </div>
</template>


<script>
  import {router} from '../../main'
  import {Input, Button, Dropdown, DropdownMenu, DropdownItem, Message} from 'element-ui'

  export default {
    name: 'navigator',
    components: {
      elInput: Input,
      elButton: Button,
      elDropdown: Dropdown,
      elDropdownMenu: DropdownMenu,
      elDropdownItem: DropdownItem,
      Message
    },
    data() {
      return {
        keyword: ''
      }
    },
    methods: {
      handleSearch() {
        if (this.keyword.length === 0) {
          Message.warning('Please enter search content!')
        }
      },
      goToIndexPage() {
        router.push({name: 'IndexPage'})
      },
      goToLoginPage() {
        router.push({name: 'LoginPage'})
      },
      goToRegisterPage() {
        router.push({name: 'RegisterPage'})
      },
      handleCommand(command) {
        if (command !== 'signOut') {
          if (command === 'UserHomePage') {
//            router.push({name: 'UserHomePage', params: {userId: this.user.userId}})
          } else {
            router.push({name: command})
          }
          router.push({name: command})
        } else {
          this.signOut({
            onSuccess: () => {
              Message({
                message: 'Goodbye, ' + 'test' + '!',
                type: 'success'
              })
            }
          })
        }
      },
    }
  }
</script>

<style scoped src="./Navigator.css"></style>

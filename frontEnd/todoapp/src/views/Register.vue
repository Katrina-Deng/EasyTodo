<!--
 * @Des:
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-01 22:27:22
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-02 23:24:18
-->
<template>
  <div id="register-login">
    <a class="logo" href="/"></a>

    <div class="section-wrapper">
      <div class="account-form">
        <h1>注册 Trello</h1>
        <el-form :model="form" :rules="rule" ref="form">
          <div class="inputStyle">
            <el-form-item size="normal" prop="username">
              <el-input
                v-model="form.username"
                size="normal"
                placeholder="请输入用户名"
              >
              </el-input>
            </el-form-item>
          </div>
          <div class="inputStyle">
            <el-form-item size="normal" prop="password">
              <el-input
                type="password"
                v-model="form.password"
                size="normal"
                placeholder="请输入密码"
              >
              </el-input>
            </el-form-item>
          </div>
          <div class="inputStyle">
            <el-form-item size="normal" prop="repassword">
              <el-input
                type="password"
                v-model="form.repassword"
                size="normal"
                placeholder="请再次输入密码"
              >
              </el-input>
            </el-form-item>
          </div>
          <div class="footer">
            <div class="elbtn">
              <el-button type="primary " size="small" @click="submit"
                >注册</el-button
              >
            </div>
            <span class="signin-signup-separator">或者</span>
            <div class="elbtn">
              <el-button type="success" size="small" plain @click="login"
                >登录</el-button
              >
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    const validate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: 'Ellen',
        password: '123456',
        repassword: '123456'
      },
      rule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 50, message: '长度在 5 到 50 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 50, message: '长度在 6 到 32 个字符', trigger: 'blur' }
        ],
        repassword: [{ required: true, validator: validate, trigger: 'blur' }]
      }
    }
  },

  methods: {
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const res = await this.$store.dispatch('user/register', {
            name: this.form.username,
            password: this.form.password,
            rePassword: this.form.repassword
          })
          // console.log(res)
          if (res.status === 201) {
            this.$message.success('注册成功')
            this.$router.push({ name: 'Login' })
          }
        } else {
          this.$message.error('注册失败')
          return false
        }
      })
    },
    login() {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  margin-top: 2em;
}
.elbtn {
  width: 100%;
  .el-button {
    width: inherit;
  }
}
</style>

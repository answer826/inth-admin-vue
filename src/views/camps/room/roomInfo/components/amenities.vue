<template>
  <div class="step-con">
    <div class="tit-con">
      <div class="tit">
        <h2 class="name">第二步 房间特色</h2>
        <p class="tip">请选择房间特色信息</p>
      </div>
    </div>
    <div class="container">
      <el-form ref="form" class="form" label-width="80px">
        <div class="transfer">
          <el-transfer v-model="roomData.roomInfo.amenities" :data="amenities" :titles="['未选择', '已选择']">
            <div slot-scope="{ option }" class="info">
              <div class="name">{{ option.label }}</div>
              <div class="options" @click.stop>
                <span @click.stop.prevent="editAmenity(option)">编辑</span>
                <span @click.stop.prevent="delAmenity(option)">删除</span>
              </div>
            </div>
            <div slot="left-footer" class="transfer-footer">
              <span @click.stop.prevent="editAmenity({name: '',fontawesome_code: ''})">新增</span>
            </div>
          </el-transfer>
        </div>
        <el-form-item size="large">
          <el-button @click="changeStep(0)">上一步</el-button>
          <el-button type="primary" :disabled="!roomData.roomInfo.amenities.length" @click="changeStep(2)">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="设施编辑"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div>
        <el-form ref="form" class="form" :model="currentAmenity" :rules="rules" label-width="80px">
          <el-form-item label="设施名称" prop="name">
            <el-input v-model="currentAmenity.name" placeholder="请输入房间名称" />
          </el-form-item>
          <el-form-item label="设施图标" prop="fontawesome_code">
            <el-input v-model="currentAmenity.fontawesome_code" placeholder="请输入图标code">
              <i slot="prefix" :class="`fas fa-${currentAmenity.fontawesome_code}`" />
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="amenitySaving" @click="doSaveAmenity">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    roomData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      amenities: [],
      dialogVisible: false,
      currentAmenity: {},
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'change' }
        ],
        fontawesome_code: [
          { required: true, message: '请输入图标code', trigger: 'change' }
        ]
      },
      amenitySaving: false
    }
  },
  mounted() {
    this.getAmenities()
  },
  methods: {
    changeStep(step) {
      this.$emit('dispatch', 'changeStep', step)
    },
    // 获取设施列表
    getAmenities() {
      this.$store.dispatch('amenity/getAmenities').then(res => {
        this.amenities = (res.data || []).map(item => {
          return {
            ...item,
            key: item.id,
            label: item.name
          }
        })
        if (this.dialogVisible) this.handleClose()
      })
    },
    // 设置编辑的设施
    editAmenity(option) {
      this.dialogVisible = true
      this.currentAmenity = option
    },
    // 关闭设施编辑框
    handleClose() {
      this.dialogVisible = false
      this.currentAmenity = {}
    },
    // 新增、编辑保存更改
    doSaveAmenity() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const params = {
            name: this.currentAmenity.name,
            fontawesome_code: this.currentAmenity.fontawesome_code
          }
          this.amenitySaving = true
          if (this.currentAmenity.id > 0) {
            // 编辑逻辑
            params.id = this.currentAmenity.id
            this.$store.dispatch('amenity/updateAmenity', params).then(res => {
              this.$message({
                message: '编辑成功！',
                type: 'success'
              })
              this.getAmenities()
            }).finally(() => {
              this.amenitySaving = false
            })
          } else {
            // 新增逻辑
            this.$store.dispatch('amenity/addAmenity', params).then(res => {
              this.$message({
                message: '新增成功！',
                type: 'success'
              })
              this.getAmenities()
            }).finally(() => {
              this.amenitySaving = false
            })
          }
        }
      })
    },
    // 设施营地
    delAmenity(amenity) {
      this.$confirm(`确定要删除${amenity.name}吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('amenity/delAmenity', amenity.id).then(res => {
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          this.getAmenities()
        })
      }).catch(() => {})
    }
  }
}
</script>
<style lang="scss">
.transfer{
  .transfer-footer{
    margin: 10px;
    text-align: right;
    span{
      color: #409EFF;
      cursor: pointer;
    }
  }
  .el-transfer-panel{
    width: 250px;
    .el-transfer-panel__item{
      cursor: default;
      &:hover{
        color: #000;
      }
      &.el-checkbox{
        margin-right: 0;
      }
      .info {
        display: flex;
        justify-content: space-between;
        padding-right: 10px;
        .options>span{
          margin-left: 5px;
          cursor: pointer;
          &:hover{
            color: #409EFF;
          }
        }
      }
    }
  }
}
</style>

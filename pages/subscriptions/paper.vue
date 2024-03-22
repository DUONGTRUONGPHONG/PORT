<script setup lang="ts">
import { ref } from 'vue';
import { useProvince } from '~/stores/v2/province';

interface FormData {
  tenNguoiDat: string;
  email: string;
  soDienThoai: string;
  loaiBao: string;
  city: string;
  wards: string;
  district: string;
  address: string;
  // Thêm các trường dữ liệu khác tương tự
}

const form = ref<FormData>({
  tenNguoiDat: "",
  email: "",
  soDienThoai: "",
  loaiBao: "",
  city: "",
  wards: "",
  district: "",
  address: "",
  // Thêm giá trị mặc định cho các trường khác
});

// const provinceStore = useProvince()
// const all = await provinceStore.fetchAll
// console.log(all)

const submitForm = () => {
};
</script>
<template>
  <Wrap>
    <Row class="mt-5">
      <MainCol>
        <div class="mt-3">
          <div>
            <h2 class="text-2xl font-bold mb-4">Thông Tin</h2>
            <form @submit.prevent="submitForm">
              <div class="mb-4">
                <label for="ten_nguoi_dat" class="block text-sm font-medium text-gray-600 font-semibold">Tên người
                  đặt:</label>
                <input v-model="form.tenNguoiDat" type="text" id="ten_nguoi_dat" name="ten_nguoi_dat"
                  class="mt-1 p-2 border w-full sm:w-96" required>
              </div>

              <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-600 font-semibold">Email:</label>
                <input v-model="form.email" type="email" id="email" name="email" class="mt-1 p-2 border w-full sm:w-96"
                  required>
              </div>

              <div class="mb-4">
                <label for="so_dien_thoai" class="block text-sm font-medium text-gray-600 font-semibold">Số điện
                  thoại:</label>
                <input v-model="form.soDienThoai" type="tel" id="so_dien_thoai" name="so_dien_thoai"
                  class="mt-1 p-2 border w-full sm:w-96" required>
              </div>

              <div class="mb-4">
                <label for="thanh_pho" class="block text-sm font-medium text-gray-600 font-semibold">Chọn Thành
                  Phố/Tỉnh:</label>
                <select v-model="form.city" id="thanh_pho" name="thanh_pho" class="mt-1 p-2 border w-full sm:w-96"
                  required >
                  <option value="hanoi" class="text-sm">Thành Phố Hà Nội</option>
                  <option value="hochiminh" class="text-sm">Thành Phố Hồ Chí Minh</option>
                </select>
              </div>

              <div class="mb-4">
                <label for="quan_huyen" class="block text-sm font-medium text-gray-600 font-semibold">Chọn
                  Quận/Huyện</label>
                <select v-model="form.district" type="text" id="quan_huyen" name="quan_huyen"
                  class="mt-1 p-2 border w-full sm:w-96" required>
                  <option value="hanoi" class="text-sm">Thành Phố Hà Nội</option>
                  <option value="hochiminh" class="text-sm">Thành Phố Hồ Chí Minh</option>
                </select>
              </div>

              <div class="mb-4">
                <label for="phuong_xa" class="block text-sm font-medium text-gray-600 font-semibold">Chọn
                  Phường/Xã</label>
                <select v-model="form.wards" type="text" id="phuong_xa" name="phuong_xa"
                  class="mt-1 p-2 border w-full sm:w-96" required>
                  <option value="hanoi" class="text-sm">Thành Phố Hà Nội</option>
                  <option value="hochiminh" class="text-sm">Thành Phố Hồ Chí Minh</option>
                </select>
              </div>

              <div class="mb-4">
                <label for="address" class="block text-sm font-medium text-gray-600 font-semibold">Số Nhà/Đường</label>
                <input v-model="form.address" type="text" id="address" name="address"
                  class="mt-1 p-2 border w-full sm:w-96" required>
              </div>
              <div class="form-group">
                <label class="mb-2 font-bold">Thông tin đặt báo (<a href="BangGiaDatBao.htm" target="_blank"
                    class="text-blue-500 hover:underline">Tham khảo bảng giá đặt báo dài hạn</a>)</label>
                <div id="updateZoneListType" class="p-2 space-y-4">

                  <table id="ckbListType" class="inline-item border-collapse">
                    <tbody>
                      <tr>
                        <td><input id="ckbListType_0" type="checkbox" name="ckbListType$0" value="6" class="mr-2">
                          <label for="ckbListType_0">Nhật báo Tuổi Trẻ</label>
                        </td>
                        <td><input id="ckbListType_1" type="checkbox" name="ckbListType$1" value="7" class="ml-4 mr-2">
                          <label for="ckbListType_1">Tuổi Trẻ Cuối Tuần</label>
                        </td>
                        <td><input id="ckbListType_2" type="checkbox" name="ckbListType$2" value="8" class="ml-4 mr-2">
                          <label for="ckbListType_2">Tuổi Trẻ Cười</label>
                        </td>
                      </tr>
                      <tr>
                        <td><input id="ckbListType_3" type="checkbox" name="ckbListType$3" value="41" class="mr-2">
                          <label for="ckbListType_3">Mực tím</label>
                        </td>
                        <td><input id="ckbListType_4" type="checkbox" name="ckbListType$4" value="39" class="ml-4 mr-2">
                          <label for="ckbListType_4">Nhi đồng</label>
                        </td>
                        <td><input id="ckbListType_5" type="checkbox" name="ckbListType$5" value="38" class="ml-4 mr-2">
                          <label for="ckbListType_5">Rùa vàng</label>
                        </td>
                      </tr>
                      <tr>
                        <td><input id="ckbListType_6" type="checkbox" name="ckbListType$6" value="40" class="mr-2">
                          <label for="ckbListType_6">Khăn Quàng Đỏ</label>
                        </td>
                        <td><input id="ckbListType_7" type="checkbox" name="ckbListType$7" value="42" class="ml-4 mr-2">
                          <label for="ckbListType_7">Ngôi sao nhỏ</label>
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <table class="table border border-collapse w-full mt-5 mb-5">
                <thead>
                  <tr>
                    <th class="border px-4 py-2">STT</th>
                    <th class="border px-4 py-2">Loại báo</th>
                    <th class="border px-4 py-2 hidden md:table-cell">Từ ngày</th>
                    <th class="border px-4 py-2 hidden md:table-cell">Đến ngày</th>
                    <th class="border px-4 py-2">Giá</th>
                    <th class="border px-4 py-2">Số kỳ</th>
                    <th class="border px-4 py-2">Số lượng</th>
                    <th class="border px-4 py-2">Khuyến mãi</th>
                    <th class="border px-4 py-2">Thành tiền</th>
                    <th class="border px-4 py-2"></th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <td colspan="10" class="border px-4 py-2">
                      <div class="total">
                        <span id="rptData_lblTotal" class="font-bold">Tổng số tiền phải thanh toán: </span>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
              <div class="row">
                <div class="col-sm-8 mt-4 mb-4">
                  <label class="font-bold">Thông tin xuất hóa đơn (nếu có)</label>
                  <div class="form-group mb-4">
                    <input v-model="form.email" type="email" id="email" name="email" class="mt-1 p-2 border w-100"
                      placeholder="Tên Đơn Vị" required>
                  </div>
                  <div class="form-group mb-4">
                    <input v-model="form.email" type="email" id="email" name="email" class="mt-1 p-2 border w-100"
                      placeholder="Mã Số Thuế" required>
                  </div>
                  <div class="form-group mb-4">
                    <input v-model="form.email" type="email" id="email" name="email" class="mt-1 p-2 border w-100"
                      placeholder="Địa chỉ" required>
                  </div>
                </div>
              </div>
              <div class="form-group mb-4">
                <label class="font-bold">Hình thức thanh toán</label>

                <div class="form-group mt-2">
                  <span id="rdbListTypeCollect" class="checkbox">
                    <input id="rdbListTypeCollect_0" type="radio" name="rdbListTypeCollect" value="2" class="mr-2">
                    <label for="rdbListTypeCollect_0">Tại tòa soạn</label><br>
                    <input id="rdbListTypeCollect_1" type="radio" name="rdbListTypeCollect" value="0" class="mr-2">
                    <label for="rdbListTypeCollect_1">Tại nhà</label><br>
                    <input id="rdbListTypeCollect_2" type="radio" name="rdbListTypeCollect" value="3" class="mr-2">
                    <label for="rdbListTypeCollect_2">Chuyển khoản</label><br>
                    <input id="rdbListTypeCollect_3" type="radio" name="rdbListTypeCollect" value="1" class="mr-2">
                    <label for="rdbListTypeCollect_3">Cổng thanh toán</label>
                  </span>
                </div>

                <div id="zoneUpdateAddress2">
                </div>
              </div>

              <div class="mb-4 flex justify-center">
                <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Đặt
                  Báo</button>
              </div>
            </form>
          </div>
        </div>
        <hr />
        <p class="text-red-500 font-bold mt-4 mb-4">
          Lưu ý: Các địa bàn vùng sâu, vùng xa sẽ tính phụ thu phí sử dụng dịch vụ giao báo ngoài hệ thống phát hành
          (nhân viên phát hành sẽ trao đổi trực tiếp với bạn đọc mức phí theo khu vực)
      </p>

    </MainCol>
    <RightCol class="pl-8 hidden xl:block">
      <div class="grid place-items-center text-3xl font-semibold bg-neutral-1 rounded border-1 h-80">
        Mời<br />
        Quảng cáo
      </div>
    </RightCol>
  </Row>
</Wrap></template>
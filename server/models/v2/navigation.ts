import Base from "./base";

/**
 * Represents a navigation item.
 */
export type NavigationItem = {
    id: number;
    siteId: number;
    title: string;
    content: string;
    feature?: string;
    taxonomy?: string;
    status: number;    
} & Base;

const navigation = `
<ul class="parent">
<li><a href="/thoi-su" data-title="data-description=" data-code="data-keyword=" data-target="data-type=" data-feature="true">Thời sự</a>
<ul>
<li><a href="/tin-tuc" data-title="data-description=" data-description="data-code=data-keyword=" data-code="data-keyword=data-target=_blank" data-target="_blank" data-type="data-feature=true" data-feature="true">Tin tức</a></li>
<li><a href="/thong-tin-doi-ngoai" data-title="data-description=" data-description="data-code=data-keyword=" data-code="data-keyword=data-target=_blank" data-keyword="data-target=_blank" data-type="data-feature=true" data-feature="true">Thông tin đối ngoại</a></li>
</ul>
</li>
<li><a href="/kinh-te" data-title="data-description=" data-code="data-keyword=" data-target="data-type=" data-feature="true">Kinh tế</a>
<ul>
<li><a href="/thi-truong" data-title="data-description=" data-description="data-code=data-keyword=" data-keyword="data-target=_blank" data-type="data-feature=true">Thị trường</a></li>
<li><a href="/hang-viet" data-title="data-description=" data-description="data-code=data-keyword=" data-keyword="data-target=_blank" data-type="data-feature=true">Hàng việt</a></li>
</ul>
</li>
<li><a href="/do-thi" data-title="data-description=" data-description="data-code=data-keyword=" data-code="data-keyword=data-target=_blank" data-target="_blank" data-type="data-feature=true" data-feature="true">Đô thị</a>
<ul>
<li><a href="/do-thi-24h" data-title="data-description=" data-code="data-keyword=" data-target="data-type=" data-feature="true">Đô thị 24h</a></li>
<li><a href="/giao-thong" data-title="data-description=" data-code="data-keyword=" data-target="data-type=" data-feature="true">Giao thông</a></li>
</ul>
</li>
<li><a href="/bat-dong-san" data-title="data-description=" data-code="data-keyword=" data-target="data-type=" data-feature="true">Bất động sản</a>
<ul>
<li><a href="/thi-truong" data-title="data-description=" data-description="data-code=data-keyword=" data-keyword="data-target=_blank" data-type="data-feature=true">Thị trường</a></li>
<li><a href="/tu-van-dau-tu" data-title="data-description=" data-code="data-keyword=" data-target="data-type=" data-feature="true">Tư vấn đầu tư</a></li>
<li><a href="/du-an" data-title="data-description=" data-code="data-keyword=" data-target="data-type=" data-feature="true">Dự án</a></li>
</ul>
</li>
<li><a href="/y-te" data-title="data-description=" data-code="data-keyword=" data-target="data-type=" data-feature="true">Y tế</a>
<ul>
<li><a href="/an-toan-thuc-pham" data-title="data-description=" data-code="data-keyword=" data-target="data-type=" data-feature="true">An toàn thực phẩm</a></li>
<li><a href="/tu-van-suc-khoe" data-title="data-description=" data-code="data-keyword=" data-target="data-type=" data-feature="true">Tư vấn sức khỏe</a></li>
</ul>
</li>
<li><a href="/giao-duc" data-title="data-description=" data-code="data-keyword=" data-target="data-type=" data-feature="true">Giáo dục</a>
<ul>
<li><a href="/tuyen-sinh" data-title="data-description=" data-code="data-keyword=" data-target="data-type=" data-feature="true">Tuyển sinh</a></li>
<li><a href="/cau-chuyen-hoc-duong" data-title="data-description=" data-code="data-keyword=" data-target="data-type=" data-feature="true">Câu chuyên học đường</a></li>
</ul>
</li>
<li><a href="/doi-song" data-title="data-description=" data-code="data-keyword=" data-target="data-type=" data-feature="true">Đời sống</a>
<ul>
<li><a href="/viec-lam-an-sinh-xa-hoi" data-title="data-description=" data-code="data-keyword=" data-target="data-type=" data-feature="true">Việc làm - an sinh xã hội</a></li>
<li><a href="/phong-su-ghi-chep" data-title="data-description=" data-code="data-keyword=" data-target="data-type=" data-feature="true">Phóng sự ghi chép</a></li>
</ul>
</li>
<li><a href="/van-hoa" data-title="data-description=" data-code="data-keyword=" data-target="data-type=" data-feature="true">Văn hóa</a>
<ul>
<li><a href="/van-nghe" data-title="data-description=" data-code="data-keyword=" data-target="data-type=" data-feature="true">Văn nghệ</a></li>
<li><a href="/ha-noi-thanh-lich-van-minh" data-title="data-description=" data-code="data-keyword=" data-target="data-type=" data-feature="true">Hà Nội thanh lịch văn minh</a></li>
</ul>
</li>
<li><a href="/phap-luat" data-title="data-description=" data-description="data-code=data-keyword=" data-keyword="data-target=_blank" data-type="data-feature=true">Pháp luật</a>
<ul>
<li><a href="/pha-an" data-title="data-description=" data-code="data-keyword=" data-target="data-type=" data-feature="true">Phá án</a></li>
<li><a href="/phap-dinh" data-title="data-description=" data-code="data-keyword=" data-target="data-type=" data-feature="true">Pháp đình</a></li>
</ul>
</li>
<li><a href="/quoc-te" data-title="data-description=" data-code="data-keyword=" data-target="data-type=" data-feature="true">Quốc tế</a>
<ul>
<li><a href="/quoc-te-24h" data-title="data-description=" data-code="data-keyword=" data-target="data-type=" data-feature="true">Quốc tế 24h</a></li>
<li><a href="/kinh-te-tai-chinh-toan-cau" data-title="data-description=" data-code="data-keyword=" data-target="data-type=" data-feature="true">Kinh tế tài chính toàn cầu</a></li>
</ul>
</li>
<li> <a href="/multimedia" data-title="" data-description="" data-code="" data-keyword="" data-target="" data-type="1" data-feature="true">Multimedia</a>
<ul>
<li><a href="/podcast" data-title="" data-description="" data-code="" data-keyword="" data-target="" data-type="1" data-feature="true">Podcast</a></li>
<li><a href="/anh" data-title="" data-description="" data-code="" data-keyword="" data-target="" data-type="1" data-feature="true">Ảnh</a></li>
<li><a href="/video-clip" data-title="" data-description="" data-code="" data-keyword="" data-target="" data-type="1" data-feature="true">Video Clip</a></li>
<li><a href="/infographics" data-title="" data-description="" data-code="" data-keyword="" data-target="" data-type="1" data-feature="true">Infographics</a></li>
<li><a href="/emagazine" data-title="" data-description="" data-code="" data-keyword="" data-target="" data-type="1" data-feature="true">Emagazine</a></li>
</ul>
</li>
<li> <a href="/chuyen-doi-so" data-title="" data-description="" data-code="" data-keyword="" data-target="" data-type="1" data-feature="true">Chuyển đổi số</a>
<ul>
<li><a href="/cong-nghe" data-title="" data-description="" data-code="" data-keyword="" data-target="" data-type="1" data-feature="true">Công nghệ</a></li>
<li><a href="/trai-nghiem" data-title="" data-description="" data-code="" data-keyword="" data-target="" data-type="1" data-feature="true">Trải nghiệm</a></li>
</ul>
</li>
</ul>
`

export const get = () =>{
    return navigation;
}
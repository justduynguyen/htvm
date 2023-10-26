import { Typography } from '@material-tailwind/react';

const RuleTwo = () => {
  return (
    <div className='bg-white rounded-xl p-12 w-[87.5vw] h-[55vh] shadow px-[100px]'>
      <Typography className='text-primary-1 text-[40px] text-center font-bold uppercase mb-8'>
        Phong cách giao thông
      </Typography>
      <div className='h-full overflow-auto'>
        <Typography className='text-[32px] font-semibold text-justify'>
          Các đội thi tự chuẩn bị tên và giới thiệu về tên đội thi của mình
          trong vòng 02 phút sao cho có ý nghĩa và thể được tinh thần của đội.
          Có thể giới thiệu về những điểm mạnh và đặc trưng của các thành viên
          trong đội. Đặc biệt phải có câu slogan, khẩu hiệu, thông điệp về An
          toàn giao thông của đội. Mỗi đội sẽ nhận được điểm từ Ban Giám khảo
          dựa trên sự sáng tạo, tổ chức, nội dung và cách trình bày của phần
          giới thiệu.
        </Typography>
      </div>
    </div>
  );
};

export default RuleTwo;

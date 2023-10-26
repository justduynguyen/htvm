import { Typography } from '@material-tailwind/react';

const Rule = () => {
  return (
    <div className='bg-white rounded-xl p-12 w-[87.5vw] h-[65vh] mt-[10vh] shadow'>
      <div className='overflow-auto h-full'>
        <Typography className='text-[26px] font-semibold'>
          <span className='font-bold'>{`- Khối Tiểu học (14 đội) bốc thăm chia thành 4 lượt đấu:`}</span>
          <br />+ Lượt 1: 4 đội
          <br />+ Lượt 2: 4 đội
          <br />+ Lượt 3: 3 đội
          <br />+ Lượt 4: 3 đội
          <br />
          &rArr;{' '}
          <span className='italic'>
            Sau mỗi lượt thi, BTC chọn 01 đội cao điểm nhất/mỗi lượt để vào vòng
            trong.
          </span>
          <br /> <br />
          <span className='font-bold'>{`- Khối Trung học cơ sở (6 đội) bốc thăm chia thành 2 lượt thi đấu:`}</span>
          <br />+ Lượt 1: 3 đội
          <br />+ Lượt 2: 3 đội
          <br />
          &rArr;{' '}
          <span className='italic'>
            Sau mỗi lượt thi, BTC chọn 02 đội cao điểm nhất/mỗi lượt để vào vòng
            trong.
          </span>
          <br />
          <br />
          <span className='font-bold'>{`Có 12 câu hỏi ở nội dung này:`}</span>
          <br />- Đối với 08 câu hỏi đầu tiên, người dẫn chương trình sẽ đọc
          xong câu hỏi và ra hiệu lệnh; trong vòng 5 giây các đội thi trả lời
          bằng cách giơ bảng A, B, C, D. Quá thời gian 5 giây sẽ không tính kết
          quả của đội thi đó. Mỗi câu trả lời đúng được cộng 10 điểm. Trả lời
          sai và không trả lời được sẽ không bị trừ điểm.
          <br />- Đối với 04 câu hỏi tiếp theo, người dẫn chương trình sẽ đọc
          xong câu hỏi và ra hiệu lệnh, đội nào bấm chuông trước sẽ được quyền
          trả lời. Trả lời đúng được cộng 10 điểm. Trả lời sai, một trong các
          đội còn lại có quyền bấm chuông trả lời sau hiệu lệnh MC. Nếu tiếp tục
          trả lời sai sẽ bỏ qua câu hỏi. Mỗi đội sẽ được đặt 01 lần duy nhất
          “ngôi sao may mắn”, bấm chuông trả lời đúng được gấp đôi số điểm, trả
          lời sai bị trừ chính số điểm của câu hỏi đó.
          <br /> <span className='font-bold'>Lưu ý: </span>Sau khi kết thúc phần
          thi của 02 khối, các đội có số điểm bằng nhau sẽ giành quyền bấm
          chuông trả lời câu hỏi phụ. Trả lời đúng đi tiếp vào vòng trong. Trả
          lời sai, một trong các đội còn lại bấm chuông trả lời đúng thì đội đó
          sẽ đi tiếp.
        </Typography>
      </div>
    </div>
  );
};

export default Rule;

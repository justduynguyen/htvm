import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import ChildrenImage from '../public/4.jpeg';
const RuleThree = () => {
  return (
    <div className='bg-white rounded-xl p-12 w-[87.5vw] h-[65vh] mt-[10vh] shadow px-[100px]'>
      <Typography className='text-primary-1 text-[40px] text-center font-bold uppercase mb-8'>
        Giao thông khoẻ
      </Typography>
      <div className='h-full overflow-auto'>
        <Typography className='text-[32px] font-semibold text-center'>
          Mỗi khối chơi một trò chơi vận động, trò chơi do BTC đưa ra. Căn cứ
          vào thứ hạng sẽ cộng điểm tương ứng cho các đội (+30, +25, +20, +15).
        </Typography>

        <Image
          src={ChildrenImage}
          width={500}
          height={300}
          alt='image'
          className='mx-auto'
        />
      </div>
    </div>
  );
};

export default RuleThree;

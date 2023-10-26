import { Button, Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import Banner from '@/components/Banner';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import { FileUploader } from 'react-drag-drop-files';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import ScoreBoardScreen from '@/components/ScoreBoardScreen';
import useSound from 'use-sound';

const fileTypes = ['XLSX'];
const label = 'Kéo thả file vào đây hoặc tải lên từ thiết bị';

const convertExcelToJson = async (file) => {
  try {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: '',
    });
    const result = jsonData.slice(1).map((x) => ({ name: x[0], score: x[1] })); //remove header
    if (result.length !== 4) {
      window.alert('File Excel không đúng định dạng template mẫu');
      return null;
    }
    return result;
  } catch {
    window.alert('File Excel không đúng định dạng template mẫu');
    return null;
  }
};
export default function Ceremony() {
  const router = useRouter();
  const [primaryData, setPrimaryData] = useState(null);
  const [secondaryData, setSecondaryData] = useState(null);
  const [schoolLevel, setSchoolLevel] = useState(0);

  const [playFinish, { stop }] = useSound('ceremony.mp3', { loop: true });

  const isShowResult = schoolLevel > 0;
  const handlePrimary = async (file) => {
    const data = await convertExcelToJson(file);
    console.log(data);
    setPrimaryData(data);
  };

  const handleSecondary = async (file) => {
    const data = await convertExcelToJson(file);
    console.log(data);
    setSecondaryData(data);
  };

  const handleGoNext = () => {
    if (schoolLevel === 1) {
      setSchoolLevel(2);
    } else {
      stop();
      router.push('/');
    }
  };

  const handleShowResult = () => {
    if (primaryData === null) {
      window.alert('Vui lòng chọn file Excel tiểu học');
      return;
    }
    if (secondaryData === null) {
      window.alert('Vui lòng chọn file Excel THCS');
      return;
    }
    playFinish();
    setSchoolLevel(1);
  };
  if (!isShowResult) {
    return (
      <div
        className='relative flex justify-center w-screen h-screen'
        style={{
          backgroundImage: "url('/start.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Banner title={'Thiết lập tổng kết'} header='Lễ khen thưởng' />
        <div className='w-[45vw] h-[65vh] bg-white rounded-[24px] border-[3px] border-primary p-12 relative mt-[221px]  flex flex-col items-center'>
          <Typography className='mb-5 text-xl font-semibold leading-6 uppercase'>
            Nhập file khối tiểu học
          </Typography>
          <FileUploader
            name='file'
            types={fileTypes}
            label={label}
            handleChange={handlePrimary}
          />
          <Typography className='mt-8 mb-5 text-xl font-semibold leading-6 uppercase'>
            Nhập file khối trung học cơ sở
          </Typography>
          <FileUploader
            handleChange={handleSecondary}
            name='file'
            types={fileTypes}
            label={label}
          />
          <Button
            className='bg-primary-dark h-[60px] flex items-center justify-center gap-3 !absolute right-12 bottom-12 w-52'
            onClick={handleShowResult}
            //disabled={players.length === 0}
          >
            <Typography className='text-xl font-semibold'>BẮT ĐẦU</Typography>
            <ChevronDoubleRightIcon className='w-5 h-5' />
          </Button>
        </div>
        <Button
          className='bg-primary-dark !opacity-40 hover:!opacity-100 h-[60px] flex items-center justify-center border-2 border-white !absolute bottom-4 left-8'
          onClick={() => router.push('/')}
        >
          <Typography className='text-xl font-semibold'>Lượt thi</Typography>
        </Button>
      </div>
    );
  }
  return (
    <div className='relative'>
      <ScoreBoardScreen
        players={schoolLevel === 1 ? primaryData : secondaryData}
        schoolLevel={schoolLevel}
      />
      <Button
        className='bg-primary-dark h-[60px] flex items-center justify-center border-2 border-white !absolute bottom-4 right-8 !opacity-40 hover:!opacity-100'
        onClick={handleGoNext}
      >
        <Typography className='text-xl font-semibold'>
          {schoolLevel === 1 ? 'Tiếp tục' : 'Hoàn thành'}
        </Typography>
      </Button>
    </div>
  );
}

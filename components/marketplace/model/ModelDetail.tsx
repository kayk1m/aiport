import React from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';

// components
import Button from '@components/ui/Button';
import SectionTitle from '@components/core/SectionTitle';
import { useUI } from '@components/ui/context';

// labraries
import addToMyModelById from '@lib/addToMyModelById';

// icons
import { ChevronDownIcon, EyeIcon, StarIcon } from '@heroicons/react/solid';

interface Props {
  className?: string;
  model: ModelInfo;
}

const ModelDetail = ({ className, model }: Props) => {
  const router = useRouter();
  const { showNoti, showModal, closeModal } = useUI();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleAddToMyModel = React.useCallback(async () => {
    setLoading(true);
    try {
      await addToMyModelById(model._id);
      showModal({
        title: 'Success',
        content: 'It has been added to your Model',
        actionButton: {
          label: 'Go to Model',
          onClick: () => {
            router.push(`/model/jupyter?modelId=${model._id}`);
            closeModal();
          },
        },
        cancelButton: {
          label: 'Stay in this page',
          onClick: () => closeModal(),
        },
      });
    } catch (err) {
      if (err.code === 101)
        showModal({
          variant: 'alert',
          title: 'Error',
          content: err.message,
          actionButton: {
            label: 'Go to Model',
            onClick: () => {
              router.push(`/model/jupyter?modelId=${model._id}`);
              closeModal();
            },
          },
          cancelButton: {
            label: 'Stay in this page',
            onClick: () => closeModal(),
          },
        });
      else showNoti({ title: 'Error', content: err.message, variant: 'alert' });
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [showNoti, model, showModal, closeModal, router]);
  return (
    <>
      <SectionTitle className="px-8" picture="/icon/model.png" title="Model" />
      <div className={cn(className, 'divide-y-2')}>
        <div className="flex py-4">
          <img
            src="/images/project/cover1.jpg"
            className="object-cover w-80 h-80 rounded-md"
          />
          <div className="divide-y-2 px-4 w-full">
            <div className="flex justify-between pb-2 w-full">
              <p className="text-2xl font-semibold">{model.name}</p>
              <div className="flex">
                <div className="flex items-center ml-4">
                  <StarIcon color="orange" className="w-6 h-6" />
                  <p className="text-gray-600 pl-1">
                    {model.star.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center ml-4">
                  <EyeIcon className="w-6 h-6" color="gray" />
                  <p className="text-gray-600 pl-1">
                    {model.star.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-4 py-4">
              <div className="w-[100px] space-y-2 text-md font-semibold">
                <p className="text-red-500">Price</p>
                <p>Owner</p>
                <p>Framework</p>
              </div>
              <div className="space-y-2 text-md font-medium">
                <p className="text-red-500">
                  {model.isPublic ? 'FREE' : '120.65'}
                </p>
                <p>{model.owner}</p>
                <p>{model.framework}</p>
              </div>
            </div>
            <div>
              <div className="pt-4 line-clamp-4">
                대충 긴 설명대충 긴 설명대충 긴 설명대충 긴 설명대충 긴 설명대충
                긴 설명대충 긴 설명대충 긴 설명대충 긴 설명대충 긴 설명대충 긴
                설명 대충 긴 설명대충 긴 설명대충 긴 설명대충 긴 설명대충 긴
                설명대충 긴 설명대충 긴 설명대충 긴 설명대충 긴 설명대충 긴
                설명대충 긴 설명대충 긴 설명 대충 긴 설명대충 긴 설명대충 긴
                설명대충 긴 설명대충 긴 설명대충 긴 설명대충 긴 설명대충 긴
                설명대충 긴 설명대충 긴 설명대충 긴 설명대충 긴 설명대충 긴
                설명대충 긴 설명대충 긴 설명대충 긴 설명 대충 긴 설명대충 긴
                설명대충 긴 설명대충 긴 설명대충 긴 설명대충 긴 설명대충 긴
                설명대충 긴 설명대충 긴 설명대충 긴 설명대충 긴 설명대충 긴
                설명대충 긴 설명대충 긴 설명대충 긴 설명 대충 긴 설명대충 긴
                설명대충 긴 설명대충 긴 설명대충 긴 설명대충 긴 설명대충 긴
                설명대충 긴 설명대충 긴 설명
              </div>
              <button className="w-full text-left items-center flex text-lightBlue-400 mt-2">
                <p>See More</p>
                <ChevronDownIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="w-96 ml-8 space-y-2">
            <Button
              disabled={loading}
              onClick={() => handleAddToMyModel()}
              className="w-full"
            >
              Add to my Model
            </Button>
            <Button disabled={loading} className="w-full">
              Download Source Code
            </Button>
            <Button disabled={loading} className="w-full">
              Buy License
            </Button>
          </div>
        </div>
        <div className="py-4">여기에 다른 부스 보기 자리</div>
      </div>
    </>
  );
};

export default ModelDetail;
import { FC } from 'react';
import Link from "next/link";
export const ContentContainer: FC = props => {

  return (
    <div className='content-wrapper'>
    {props.children}
    </div>
  );
};

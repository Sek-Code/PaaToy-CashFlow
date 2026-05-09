import React from 'react'
import { RaiRab } from '@/components/ui/RaiRub';
import { CategoryIcon } from '@/components/ui/CategoryIcon';

type Props = {}

export default function Category({}: Props) {
    return (
      <div>
            <div>รายรับ-รายจ่ายตามประเภท</div>
            <div id="รายจ่าย">
            <div>รายจ่าย</div>
            </div>
            <div id="รายรับ">
            <div>รายรับ</div>
            </div>
        <div>ยอดคงเหลือ</div>
        <CategoryIcon icon="/category-icon/food.svg" category="expense"/>
        
      </div>
    );
}


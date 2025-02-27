import { BakeryDetailBaseEntity, BakeryDetailEntity, BakerySns, BakeryStatus } from '@/apis';
import { SnsLink } from '@/components/BakeryDetail/Form/SnsLinkArea';
import { SelectOption } from '@/components/Shared';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// 타입지정시 reducer type error..
export type BakeryForm = BakeryDetailBaseEntity & {
  productList: ProductItem[];
  status: BakeryStatus | null;
  facilityInfoList: string[];
};

export type ProductItem = {
  productId?: number;
  productType: string;
  productName: string;
  price: number;
  image: string | null;
};

const initialProductItem = {
  // productId: 0, 생성시에만 있음
  productType: 'BREAD',
  productName: '',
  price: 0,
  image: '', // 조회시에만 이미지 여기에 들어옴
};

const initialBakeryForm: BakeryForm = {
  name: '',
  image: null,
  address: '',
  latitude: 0,
  longitude: 0,
  hours: '',
  instagramURL: '',
  facebookURL: '',
  blogURL: '',
  websiteURL: '',
  phoneNumber: '',
  facilityInfoList: [],
  productList: [initialProductItem],
  status: 'UNPOSTING',
};

const initialBakeryLinks: SnsLink[] = [
  { key: 'websiteURL', value: '' },
  { key: 'instagramURL', value: '' },
  { key: 'facebookURL', value: '' },
  { key: 'blogURL', value: '' },
];

export type BakeryFormChangeKey = keyof BakeryDetailBaseEntity;

interface BakeryState {
  loading: boolean;
  error: boolean;
  form: BakeryForm;
  formLinks: SnsLink[];
  openedSnsLinkIdx: number | null;
  openedMenuTypeIdx: number | null;
}

const initialState: BakeryState = {
  loading: false,
  error: false,
  form: initialBakeryForm,
  formLinks: initialBakeryLinks,
  openedSnsLinkIdx: null,
  openedMenuTypeIdx: null,
};

const bakerySlice = createSlice({
  name: 'bakery',
  initialState,
  reducers: {
    changeForm(state, action: PayloadAction<{ name: BakeryFormChangeKey; value: never }>) {
      // naver type 수정필요
      const { name, value } = action.payload;
      state.form[name] = value;
    },
    initializeForm(state) {
      state.form = initialBakeryForm;
      state.formLinks = initialBakeryLinks;
    },
    setForm(state, action: PayloadAction<{ form: BakeryDetailEntity }>) {
      const { form } = action.payload;
      state.form = form;
    },
    changeBakeryStatus(state, action: PayloadAction<{ status: string }>) {
      const { status } = action.payload;
      state.form.status = status as BakeryStatus;
    },
    changeBakeryImg(state, action: PayloadAction<{ imgPreview: string }>) {
      const { imgPreview } = action.payload;
      state.form.image = imgPreview;
    },
    toggleLinkOption(state, action: PayloadAction<{ currIdx: number }>) {
      const { openedSnsLinkIdx } = state;
      const { currIdx } = action.payload;
      if (currIdx === openedSnsLinkIdx) {
        state.openedSnsLinkIdx = null;
      } else {
        state.openedSnsLinkIdx = currIdx;
      }
    },
    selectLinkOption(state, action: PayloadAction<{ currIdx: number; optionValue: SelectOption['value']; linkValue: string }>) {
      // 중복 선택 안되도록 구현필요
      const { currIdx, optionValue, linkValue } = action.payload;
      const target = state.formLinks[currIdx];
      state.formLinks.splice(currIdx, 1, { ...target, key: optionValue as BakerySns });

      const updatedLinks: { [name: string]: string } = {};
      state.formLinks.forEach(link => {
        updatedLinks[optionValue] = linkValue;
      });
      state.form = { ...state.form, ...updatedLinks };
    },
    changeLinkValue(state, action: PayloadAction<{ currIdx: number; optionValue: SelectOption['value']; linkValue: string }>) {
      const { currIdx, optionValue, linkValue } = action.payload;
      const target = state.formLinks[currIdx];
      state.formLinks.splice(currIdx, 1, { ...target, value: linkValue });

      const updatedLinks: { [key: string]: string } = {};
      state.formLinks.forEach(link => {
        updatedLinks[optionValue] = linkValue;
      });
      state.form = { ...state.form, ...updatedLinks };
    },
    setLinks(state, action: PayloadAction<{ links: SnsLink[] }>) {
      const { links } = action.payload;
      state.formLinks = links;
    },
    removeLink(state, action: PayloadAction<{ currIdx: number }>) {
      const { currIdx } = action.payload;
      state.formLinks.splice(currIdx, 1);
    },
    addLink(state) {
      state.formLinks.push({ key: 'blogURL', value: '' });
    },
    toggleMenuTypeOption(state, action: PayloadAction<{ currIdx: number }>) {
      const { openedMenuTypeIdx } = state;
      const { currIdx } = action.payload;
      if (currIdx === openedMenuTypeIdx) {
        state.openedMenuTypeIdx = null;
      } else {
        state.openedMenuTypeIdx = currIdx;
      }
    },
    selectMenuTypeOption(state, action: PayloadAction<{ currIdx: number; optionValue: SelectOption['value'] }>) {
      // 동작이 되는가?
      const { currIdx, optionValue } = action.payload;
      const target = state.form.productList[currIdx];
      state.form.productList.splice(currIdx, 1, { ...target, productType: optionValue });
    },
    changeMenuInput(state, action: PayloadAction<{ currIdx: number; name: string; value: string }>) {
      const { currIdx, name, value } = action.payload;
      const target = state.form.productList[currIdx];
      state.form.productList.splice(currIdx, 1, { ...target, [name]: value });
    },
    removeMenu(state, action: PayloadAction<{ currIdx: number }>) {
      const { currIdx } = action.payload;
      state.form.productList = state.form.productList.filter((meu, idx) => idx !== currIdx);
    },
    addMenu(state) {
      state.form.productList.push(initialProductItem);
    },
    changeMenuImg(state, action: PayloadAction<{ currIdx: number; imgPreview: string }>) {
      const { currIdx, imgPreview } = action.payload;
      const target = state.form.productList[currIdx];
      state.form.productList.splice(currIdx, 1, { ...target, image: imgPreview });
    },
  },
});

export default bakerySlice.reducer;
export const {
  changeForm,
  initializeForm,
  setForm,
  changeBakeryStatus,
  changeBakeryImg,
  toggleLinkOption,
  selectLinkOption,
  changeLinkValue,
  setLinks,
  removeLink,
  addLink,
  toggleMenuTypeOption,
  selectMenuTypeOption,
  changeMenuInput,
  removeMenu,
  addMenu,
  changeMenuImg,
} = bakerySlice.actions;

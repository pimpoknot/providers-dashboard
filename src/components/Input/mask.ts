export type IMaskOptions = 'cnpj' | 'phone' | 'cep';

type IMaskValue = {
  [value in IMaskOptions]: (prev: string) => string;
};

type IMaskEvent = {
  [value in IMaskOptions]: (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => boolean;
};

export const masks: IMaskValue = {
  cep: value => value.replace(/\D/g, '').replace(/(\d{5})(\d)/g, '$1-$2'),
  cnpj: value =>
    value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d)/, '$1.$2.$3/$4-$5'),
  phone: value => {
    const text = value.replace(/\D/g, '');

    if (text.length === 10) {
      return text.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    if (text.length === 11) {
      return text.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return text.replace(/(\d{2})(\d{2})(\d{5})(\d)/, '+$1 ($2) $3-$4');
  },
};

export const maskEvents: IMaskEvent = {
  cep: ev => {
    ev.currentTarget.maxLength = 9;
    const { value } = ev.currentTarget;

    const newValue = value.replace(/\D/g, '').replace(/(\d{5})(\d)/g, '$1-$2');

    ev.currentTarget.value = newValue;
    return value.length === ev.currentTarget.maxLength;
  },
  cnpj: ev => {
    const { value } = ev.currentTarget;

    const newValue = ((text) => {
      const { length } = text;
      if (length > 12)
        return text.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d)/, '$1.$2.$3/$4-$5');
      if (length > 8)
        return text.replace(/(\d{2})(\d{3})(\d{3})(\d)/, '$1.$2.$3/$4');
      if (length > 5)
        return text.replace(/(\d{2})(\d{3})(\d)/g, '$1.$2.$3');
      if (length > 2)
        return text.replace(/(\d{2})(\d)/g, '$1.$2');
      return text;
    })(value.replace(/\D/g, ''))

    ev.currentTarget.value = newValue;
    return value.length === ev.currentTarget.maxLength;
  },
  phone: ev => {
    ev.currentTarget.maxLength = 19;
    const { value } = ev.currentTarget;

    const newValue = ((text) => {
      const { length } = text;

      if (length > 11)
        return text.replace(/\D/g, '').replace(/(\d{2})(\d{2})(\d{5})(\d)/, '+$1 ($2) $3-$4');
      if (length > 10)
        return text.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d)/, '($1) $2-$3');
      if (length > 6)
        return text.replace(/\D/g, '').replace(/(\d{2})(\d{4})(\d)/, '($1) $2-$3');
      if (length > 2)
        return text.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2');
      return text.replace(/(\d{1})/, '($1');
    })(value.replace(/\D/g, ''));

    ev.currentTarget.value = newValue;
    return value.length >= ev.currentTarget.maxLength - 1;
  },
};
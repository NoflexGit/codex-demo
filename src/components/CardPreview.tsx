import '../CardPreview.css';

interface Props {
  cardNumber: string;
  cardholder: string;
  expirationDate: string;
  cvv: string;
  showBack: boolean;
}

const formatCardNumber = (value: string) => {
  const digits = value.replace(/\s+/g, '').padEnd(16, '*').slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
};

export function CardPreview({
  cardNumber,
  cardholder,
  expirationDate,
  cvv,
  showBack,
}: Props) {
  return (
    <div className="card-container mb-6">
      <div className={showBack ? 'card flipped' : 'card'}>
        <div className="card-face card-front">
          <div className="text-lg tracking-widest mb-4">
            {formatCardNumber(cardNumber)}
          </div>
          <div className="flex justify-between items-end text-sm">
            <span className="uppercase">{cardholder || 'NAME SURNAME'}</span>
            <span>{expirationDate || 'MM/YY'}</span>
          </div>
        </div>
        <div className="card-face card-back flex flex-col justify-end items-end pr-4 pb-8">
          <div className="bg-white text-black w-3/4 text-right px-2 py-1 rounded">
            {cvv || '***'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardPreview;

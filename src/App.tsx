import { useForm } from '@mantine/form';
import { TextInput, NumberInput, PasswordInput, Button, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { useState } from 'react';
import CardPreview from './components/CardPreview';

function App() {
  const [showBack, setShowBack] = useState(false);
  const form = useForm({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      cardholder: '',
      cardNumber: '',
      expirationDate: '',
      cvv: '',
    },
    validate: {
      cardNumber: value =>
        /^\d{16}$/.test(String(value).replace(/\s/g, '')) ? null : 'Invalid card number',
      cardholder: value => (value.trim().length > 0 ? null : 'Cardholder name is required'),
      expirationDate: value => {
        const match = String(value).match(/^(\d{2})(\d{2})$/);
        if (!match) return 'Invalid date';
        const month = Number(match[1]);
        return month >= 1 && month <= 12 ? null : 'Invalid date';
      },
      cvv: value => (/^\d{3}$/.test(String(value)) ? null : 'Invalid CVV'),
    },
  });
  return (
    <MantineProvider>
      <main className="bg-zinc-5 h-screen w-screen pt-10">
        <section className="container mx-auto flex w-[600px] flex-col items-center">
          <CardPreview
            cardNumber={String(form.values.cardNumber)}
            cardholder={form.values.cardholder}
            expirationDate={String(form.values.expirationDate)}
            cvv={String(form.values.cvv)}
            showBack={showBack}
          />
          <form
            className="flex w-[400px] flex-col items-center gap-4 rounded-lg border border-zinc-200 bg-white p-4"
            onSubmit={form.onSubmit(values => console.log(values))}
          >
            <NumberInput
              className="w-full"
              hideControls
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              onFocus={() => setShowBack(false)}
              {...form.getInputProps('cardNumber')}
            />
            <TextInput
              className="w-full"
              label="Cardholder"
              placeholder="John Doe"
              onFocus={() => setShowBack(false)}
              {...form.getInputProps('cardholder')}
            />
            <div className="flex w-full gap-4">
              <NumberInput
                maxLength={4}
                className="w-full"
                hideControls
                label="Expiration Date"
                placeholder="MM/YY"
                onFocus={() => setShowBack(false)}
                {...form.getInputProps('expirationDate')}
              />
              <PasswordInput
                maxLength={3}
                className="w-full"
                label="CVV"
                placeholder="***"
                inputMode="numeric"
                pattern="[0-9]*"
                onFocus={() => setShowBack(true)}
                onBlur={() => setShowBack(false)}
                {...form.getInputProps('cvv')}
              />
            </div>

            <Button type="submit" disabled={!form.isValid()}>
              Submit
            </Button>
          </form>
        </section>
      </main>
    </MantineProvider>
  );
}

export default App;

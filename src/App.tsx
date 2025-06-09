import { useForm } from '@mantine/form';
import { TextInput, NumberInput, Button, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

function App() {
  const form = useForm({
    initialValues: {
      cardholder: '',
      cardNumber: '',
      expirationDate: '',
      cvv: '',
    },
  });
  return (
    <MantineProvider>
      <main className="bg-zinc-5 h-screen w-screen pt-10">
        <section className="container mx-auto flex w-[600px] flex-col items-center">
          <form
            className="flex w-[400px] flex-col items-center gap-4 rounded-lg border border-zinc-200 bg-white p-4"
            onSubmit={form.onSubmit(values => console.log(values))}
          >
            <NumberInput
              className="w-full"
              hideControls
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              {...form.getInputProps('cardNumber')}
            />
            <TextInput
              className="w-full"
              label="Cardholder"
              placeholder="John Doe"
              {...form.getInputProps('cardholder')}
            />
            <div className="flex w-full gap-4">
              <NumberInput
                maxLength={4}
                className="w-full"
                hideControls
                label="Expiration Date"
                placeholder="MM/YY"
                {...form.getInputProps('expirationDate')}
              />
              <NumberInput
                maxLength={3}
                className="w-full"
                hideControls
                label="CVV"
                placeholder="123"
                {...form.getInputProps('cvv')}
              />
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </section>
      </main>
    </MantineProvider>
  );
}

export default App;

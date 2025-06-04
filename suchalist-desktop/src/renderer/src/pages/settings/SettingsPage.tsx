import Text from '@/components/base/Text';
import Button from '@renderer/components/base/Button';

export default function SettingsPage() {
  return (
    <main className="flex-1 p-10">
      <div className="p-10 bg-white/50 rounded-xl">
        <Text size="large" className="text-black font-bold">
          App Appearance
        </Text>
        <Text size="small" className="text-black">
          Set the color and background for your TODO list.
        </Text>
        <Button mode="contained" onClick={() => {}} className="mt-4">
          Change App Appearance
        </Button>
      </div>
    </main>
  );
}

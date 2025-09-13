import { generateId } from '@/utils/id';

describe('generateId', () => {
  test('produces unique-ish ids', () => {
    // Arrange
    const ids = new Set<string>();
    // Act
    for (let i = 0; i < 20; i++) ids.add(generateId());
    // Assert
    expect(ids.size).toBe(20);
  });

  test('respects prefix', () => {
    // Arrange
    const prefix = 'abc';
    // Act
    const id = generateId(prefix);
    // Assert
    expect(id.startsWith(prefix + '_')).toBe(true);
  });
});

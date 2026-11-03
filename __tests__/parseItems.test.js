const { parseItems } = require('../utils/parseItems');

describe('parseItems', () => {
  test('parses array of items with standard fields', () => {
    const mockData = [
      { id: 1, title: 'Issue A', score: 100, date: '2024-01-01' },
      { id: 2, title: 'Issue B', score: 50, date: '2024-01-02' }
    ];
    
    const result = parseItems(mockData);
    
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: 1,
      title: 'Issue A',
      score: 100,
      date: '2024-01-01'
    });
  });
  
  test('handles wrapped data in items property', () => {
    const mockData = {
      items: [
        { id: 1, title: 'Issue A', score: 100, date: '2024-01-01' }
      ]
    };
    
    const result = parseItems(mockData);
    
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });
  
  test('handles wrapped data in data property', () => {
    const mockData = {
      data: [
        { id: 1, title: 'Issue A', score: 100, date: '2024-01-01' }
      ]
    };
    
    const result = parseItems(mockData);
    
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });
  
  test('uses fallback field names', () => {
    const mockData = [
      { _id: 'abc', name: 'Issue A', rating: 85, created_at: '2024-01-01' }
    ];
    
    const result = parseItems(mockData);
    
    expect(result[0]).toEqual({
      id: 'abc',
      title: 'Issue A',
      score: 85,
      date: '2024-01-01'
    });
  });
  
  test('applies default values for missing fields', () => {
    const mockData = [
      { id: 1 }
    ];
    
    const result = parseItems(mockData);
    
    expect(result[0].id).toBe(1);
    expect(result[0].title).toBe('');
    expect(result[0].score).toBe(0);
    expect(result[0].date).toBeDefined();
  });
  
  test('coerces score to float', () => {
    const mockData = [
      { id: 1, title: 'Issue A', score: '75.5', date: '2024-01-01' }
    ];
    
    const result = parseItems(mockData);
    
    expect(typeof result[0].score).toBe('number');
    expect(result[0].score).toBe(75.5);
  });
  
  test('returns empty array for empty input', () => {
    expect(parseItems([])).toEqual([]);
    expect(parseItems({})).toEqual([]);
  });
  
  test('preserves all items in array', () => {
    const mockData = [
      { id: 1, title: 'Issue A', score: 100, date: '2024-01-01' },
      { id: 2, title: 'Issue B', score: 90, date: '2024-01-02' },
      { id: 3, title: 'Issue C', score: 80, date: '2024-01-03' }
    ];
    
    const result = parseItems(mockData);
    
    expect(result).toHaveLength(3);
    expect(result.map(r => r.id)).toEqual([1, 2, 3]);
  });
});
